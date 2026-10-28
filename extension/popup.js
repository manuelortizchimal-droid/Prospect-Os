'use strict';
const target='https://manuelortizchimal-droid.github.io/Prospect-Os/';
const status=document.getElementById('status'),button=document.getElementById('send'),nameInput=document.getElementById('name');
let groupUrl='';
async function initialize(){
 try{
  const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
  const u=new URL(tab?.url||'');
  const parts=u.pathname.split('/').filter(Boolean);
  if(!['www.facebook.com','facebook.com','m.facebook.com','web.facebook.com'].includes(u.hostname.toLowerCase())||parts[0]!=='groups'||!parts[1])throw Error('Abre un grupo de Facebook antes de usar la extensión.');
  groupUrl='https://www.facebook.com/groups/'+encodeURIComponent(parts[1]);
  const candidate=(tab.title||'').replace(/\s*\|\s*Facebook.*$/i,'').trim();
  nameInput.value=candidate==='Facebook'?'':candidate.slice(0,120);
  status.textContent='Grupo detectado. Confirma el nombre y pulsa Agregar grupo a ABI.';
 }catch(e){button.disabled=true;status.textContent=e.message||'No se pudo detectar el grupo.'}
}
button.addEventListener('click',async()=>{
 if(!groupUrl)return;
 const name=nameInput.value.trim();
 if(!name){status.textContent='Escribe el nombre visible del grupo.';return}
 const value=encodeURIComponent(JSON.stringify({type:'facebook_group',url:groupUrl,name}));
 const url=target+'#abi-import='+value;
 try{await chrome.tabs.create({url});status.textContent='Se abrió Prospect OS para importar el grupo.'}catch(e){status.textContent='No fue posible abrir Prospect OS: '+e.message}
});
initialize();