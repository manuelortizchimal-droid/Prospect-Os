# Jacana ABI — Captura orgánica para Chrome (v2.0)

## Instalación en Chrome (Windows)

1. Abre https://github.com/manuelortizchimal-droid/Prospect-Os
2. **Code → Download ZIP**. Descomprime el ZIP en una carpeta permanente del equipo.
3. Abre **chrome://extensions** y activa **Modo de desarrollador**.
4. Pulsa **Cargar descomprimida** y elige exactamente la carpeta **extension** que contiene **manifest.json**, **popup.html** y **popup.js**.
5. Fija la extensión desde el icono de rompecabezas de Chrome.
6. Si ya tenías instalada la versión 1, entra a **chrome://extensions** y pulsa **Actualizar** sobre ella (o elimínala y carga la versión 2).

## Uso: capturar publicaciones

1. Abre un grupo de Facebook con acceso autorizado.
2. Selecciona con el mouse el texto de una publicación relevante (no incluyas datos personales sin permiso).
3. Pulsa el icono de **Jacana ABI**.
4. En la pestaña **Publicación**, revisa el texto. Si no se copió la selección, usa **Leer texto seleccionado** o pega el texto manualmente.
5. Verifica el enlace específico de la publicación. Si estás viendo el grupo general, copia el enlace de esa publicación en el campo correspondiente.
6. Pulsa **Enviar publicación a Prospect OS**. Se abre la aplicación y la captura aparece en **Oportunidades Jacana**.
7. Revisa señales de compra, presupuesto, estado y enlace original. Solo tras confirmar información/consentimiento pasa el dato al CRM.

## Uso: registrar grupo

Abre el grupo de Facebook, pulsa Jacana ABI → pestaña **Grupo** → revisa el nombre → **Registrar grupo en Prospect OS**.

## Qué funciona y qué no

- Captura bajo acción explícita del usuario. La extensión lee exclusivamente la selección de texto de la pestaña activa, si Chrome lo permite, y los campos que confirmas.
- **No** supervisa grupos en segundo plano, no lee todas las publicaciones ni listas de miembros, y no accede a cookies, contraseñas ni mensajes privados.
- Clasificación por reglas transparentes (no análisis con modelo de IA remoto); las coincidencias por precio son orientativas y la unidad se confirma comercialmente.
- Datos de la aplicación en **localStorage de ese navegador/perfil**, no sincronizados entre equipos. Haz respaldos desde la sección **Datos y respaldo**.
- Los datos de una captura viajan temporalmente en el fragmento de la URL al abrir Prospect OS y el receptor lo quita al procesarlo; no incluyas datos sensibles.
- No hay conexión oficial automática de ida y vuelta con Facebook.

## Pruebas manuales de aceptación

1. Captura un texto de prueba: `Looking to buy a condo in Bucerias next month. Budget 9000000 MXN.`
2. Comprueba que aparezca en **Oportunidades Jacana** con intención alta.
3. Repite la captura: debe avisar de duplicado.
4. Actualiza la página: el registro debe permanecer.
5. Marca **Revisada**, vuelve a cargar y confirma el estado.
6. Prueba **Revisar CRM**; no registres datos privados sin consentimiento.
7. Prueba texto irrelevante de renta y verifica que no se clasifique como comprador prioritario.
8. Usa **Datos y respaldo → Descargar respaldo JSON** y comprueba que exista una copia privada.

## Estado

Código de Manifest V3 y lógica JavaScript revisados; pruebas automatizadas de sintaxis y cinco escenarios de presupuesto ejecutadas. **La extensión necesita validación real en Chrome con la sesión del usuario antes de considerarse aceptada para producción.**
