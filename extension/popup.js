'use strict';
const TARGET='https://manuelortizchimal-droid.github.io/Prospect-Os/';
const $=id=>document.getElementById(id),status=$('status');
let tab=null,groupUrl='',scanItems=[];
const queries=[
 ['Comprar condominio','"looking to buy" condo Bucerias'],
 ['Busco departamento','"busco comprar" departamento Bucerías'],
 ['Comprar propiedad','"buying property" "Bucerias"'],
 ['Retiro y vivienda','"retiring" "Bucerias" condo'],
 ['Segunda residencia','"second home" "Riviera Nayarit"'],
 ['Presupuesto declarado','"budget" "buy" "Puerto Vallarta"']
];
function setMode(mode){
 for(const name of ['Discover','Post','Group']){$(name.toLowerCase()+'Panel').classList.toggle('hidden',name.toLowerCase()!==mode);$('tab'+name).classList.toggle('active',name.toLowerCase()===mode)}
}
$('tabDiscover').onclick=()=>setMode('discover');
$('tabPost').onclick=()=>setMode('post');
$('tabGroup').onclick=()=>setMode('group');
function setStatus(msg){status.textContent=msg}
function parseFB(raw){const u=new URL(raw);if(!['facebook.com','www.facebook.com','m.facebook.com','web.facebook.com'].includes(u.hostname.toLowerCase()))throw Error('Solo Facebook');return u}
function groupLink(url){try{const u=parseFB(url),p=u.pathname.split('/').filter(Boolean);return p[0]==='groups'&&p[1]?'https://www.facebook.com/groups/'+encodeURIComponent(p[1]):''}catch{return ''}}
function rankText(text){
 const t=String(text||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const purchase=/\b(looking to buy|want to buy|planning to buy|need to buy|ready to buy|we are buying|i am buying|buying a|buy a|busco comprar|quiero comprar|quiero adquirir|comprar un|comprar una|comprar casa|comprar depa|comprar departamento)\b/.test(t);
 const home=/\b(condo|condominium|property|apartment|home|house|departamento|depa|propiedad|casa)\b/.test(t);
 const local=/bucerias|nayarit|vallarta|la cruz|riviera/.test(t);
 const timing=/next month|this month|ready to buy|asap|soon|este mes|pronto|inmediato/.test(t);
 const budget=/\b(budget|presupuesto|up to|hasta|million|millones)\b|\$\s?[\d,.]{4,}/.test(t);
 const selling=/selling (my|our|a)|for sale by owner|vendo mi|not buying|no quiero comprar/.test(t);
 const renting=/\b(rent|rental|alquiler|rentar|alquilar)\b/.test(t);
 const generalBuy=/\b(buy|buying|purchase|purchasing|comprar|compra|adquirir)\b/.test(t);const score=Math.max(0,Math.min(100,(purchase?45:generalBuy?15:0)+(home?20:0)+(local?15:0)+(timing?10:0)+(budget?10:0)-(selling?60:0)-(renting&&!purchase?35:0)));
 return {score,level:score>=65?'Alta':score>=35?'Media':'Exploratoria'};
}
function searchURL(query){return 'https://www.facebook.com/search/posts/?q='+encodeURIComponent(query)}
const queryList=$('queryList');
for(const [label,query] of queries){const b=document.createElement('button');b.textContent=label;b.title=query;b.onclick=async()=>{try{await chrome.tabs.create({url:searchURL(query)});setStatus('Búsqueda abierta. Revisa resultados y usa Analizar pantalla actual.')}catch(e){setStatus('No se pudo abrir la búsqueda: '+e.message)}};queryList.append(b)}
async function selection(){if(!tab?.id)throw Error('No se detectó la pestaña');const results=await chrome.scripting.executeScript({target:{tabId:tab.id},func:()=>window.getSelection()?.toString()?.trim()?.slice(0,2000)||''});return results?.[0]?.result||''}
$('readSelection').onclick=async()=>{try{const t=await selection();if(!t)return setStatus('No hay texto seleccionado. Puedes pegarlo manualmente.');$('postText').value=t;setStatus('Texto capturado. Revísalo antes de enviarlo.')}catch{setStatus('No se pudo leer la selección. Pega el texto manualmente.')}};
async function init(){try{[tab]=await chrome.tabs.query({active:true,currentWindow:true});const u=parseFB(tab.url||'');groupUrl=groupLink(u.href);const title=(tab.title||'').replace(/\s*\|\s*Facebook.*$/i,'').slice(0,120);$('groupName').value=title==='Facebook'?'':title;$('postGroupName').value=$('groupName').value;$('postUrl').value=u.href;try{$('postText').value=await selection()}catch{}setStatus(groupUrl?'Grupo detectado. Usa Buscar para revisar publicaciones visibles.':'Facebook detectado. Puedes revisar búsquedas o capturar texto.')}catch{setStatus('Abre Facebook para analizar publicaciones. Los botones de búsqueda siguen disponibles.')}}
function validateURL(raw){const u=parseFB(raw);if(!u.pathname||u.pathname==='/')throw Error('Indica un enlace específico de Facebook');return u.href}
$('sendPost').onclick=async()=>{try{const text=$('postText').value.trim();if(text.length<15)throw Error('Se requieren al menos 15 caracteres');const url=validateURL($('postUrl').value.trim());const data={type:'facebook_post',text:text.slice(0,2000),url,groupUrl,groupName:$('postGroupName').value.trim().slice(0,120)};const hash='#abi-post='+encodeURIComponent(JSON.stringify(data));if(hash.length>4900)throw Error('Texto demasiado largo; recorta la selección');await chrome.tabs.create({url:TARGET+hash});setStatus('Abriendo Prospect OS con la publicación seleccionada.')}catch(e){setStatus(e.message||'No se pudo enviar')}};
$('sendGroup').onclick=async()=>{try{if(!groupUrl)throw Error('Abre primero un grupo de Facebook');const name=$('groupName').value.trim();if(!name)throw Error('Escribe el nombre del grupo');const hash='#abi-import='+encodeURIComponent(JSON.stringify({type:'facebook_group',url:groupUrl,name:name.slice(0,120)}));await chrome.tabs.create({url:TARGET+hash});setStatus('Abriendo Prospect OS para registrar el grupo.')}catch(e){setStatus(e.message||'No se pudo enviar')}};
// Extracción explícita y limitada a los artículos actualmente representados en la página.
// Se evita leer perfiles, mensajes, cookies o ejecutar scroll/navegación automática.
function collectVisiblePosts(){
 const nodes=[...document.querySelectorAll('[role="article"]')].slice(0,70);
 const accepted=[],seen=new Set();
 const isVisible=el=>{const r=el.getBoundingClientRect();const st=window.getComputedStyle(el);return r.width>100&&r.height>35&&r.bottom>0&&r.top<window.innerHeight&&st.visibility!=='hidden'&&st.display!=='none'};
 for(const el of nodes){
  if(!isVisible(el))continue;
  const str=(el.innerText||'').trim().replace(/\n{3,}/g,'\n').slice(0,2000);
  if(str.length<35||seen.has(str))continue;
  seen.add(str);
  const links=[...el.querySelectorAll('a[href]')].map(a=>a.href).filter(Boolean);
  const link=links.find(x=>/facebook\.com\/groups\/[^/]+\/(?:posts|permalink)\//i.test(x))||
    links.find(x=>/facebook\.com\/(?:permalink\.php|story\.php|[^/]+\/posts\/)/i.test(x))||'';
  accepted.push({text:str,url:link});
  if(accepted.length>=25)break;
 }
 return accepted;
}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderScans(){
 $('scanCount').textContent='Oportunidades visibles: '+scanItems.length;
 $('scanResults').innerHTML=scanItems.length?scanItems.map((x,i)=>
  '<div class="result"><strong>'+esc(x.rank.level)+' · '+x.rank.score+'/100</strong><p>'+esc(x.text.slice(0,330))+'</p><button data-scan="'+i+'">Revisar para capturar</button></div>').join(''):
  '<p class="muted">No se encontraron candidatos. Prueba desplazarte a otra sección de publicaciones, luego vuelve a analizar. Facebook puede cambiar su estructura.</p>';
}
$('scanVisible').onclick=async()=>{
 try{
  const [active]=await chrome.tabs.query({active:true,currentWindow:true});tab=active;parseFB(tab?.url||'');
  const res=await chrome.scripting.executeScript({target:{tabId:tab.id},func:collectVisiblePosts});
  const items=res?.[0]?.result||[];
  scanItems=items.map(x=>({...x,rank:rankText(x.text)})).filter(x=>x.rank.score>=35).sort((a,b)=>b.rank.score-a.rank.score).slice(0,12);
  renderScans();setStatus('Revisión local completada. Elige una publicación para validar antes de enviarla. No se guardó nada automáticamente.');
 }catch(e){setStatus('No se pudo analizar esta pantalla. Abre Facebook y comprueba permisos de la extensión. '+e.message)}
};
$('scanResults').onclick=e=>{
 const b=e.target.closest('[data-scan]');if(!b)return;const x=scanItems[Number(b.dataset.scan)];if(!x)return;
 $('postText').value=x.text.slice(0,2000);
 $('postUrl').value=x.url||tab?.url||'';
 groupUrl=groupLink(tab?.url||'');
 if(!x.url)setStatus('Revisa y sustituye el enlace de la página por el enlace específico de esta publicación antes de enviarla.');
 else setStatus('Candidato cargado. Revisa texto y enlace antes de enviar.');
 setMode('post');
};
init();