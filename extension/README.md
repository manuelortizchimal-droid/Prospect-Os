# Jacana ABI — Extensión Chrome

## Instalar (Chrome escritorio)
1. Descargar la carpeta `extension` desde el repositorio a una carpeta local.
2. Abrir `chrome://extensions`.
3. Activar **Modo de desarrollador**.
4. Elegir **Cargar descomprimida** y seleccionar la carpeta `extension`.
5. Abrir un grupo de Facebook (URL de formato `facebook.com/groups/...`).
6. Hacer clic en el icono Jacana ABI, verificar nombre y pulsar **Agregar grupo a ABI**.
7. Prospect OS abrirá el registro y mostrará el grupo en **Etapa 1 · Grupos ABI**.

## Alcance y privacidad
- La extensión funciona por acción manual, solo con URL y título de la pestaña activa.
- No extrae publicaciones, miembros, fotos, ni datos privados; no elude controles ni permisos de Facebook.
- No se conecta a la cuenta Facebook ni utiliza cookies o tokens.
- El enlace de importación pasa datos no sensibles en el fragmento URL; NO incluyas datos personales en el título.
- Prospect OS guarda los grupos en el localStorage de su dominio, exclusivamente en ese navegador/perfil.
- No sincroniza entre dispositivos ni automatiza Facebook. La base de datos privada y el servicio de sincronización aún no existen.

## Validación
Manifest V3. Probar manualmente en Chrome instalado: navegación, registro, duplicados, recarga y persistencia. No se ha probado en Chrome Web Store ni publicado la extensión.
