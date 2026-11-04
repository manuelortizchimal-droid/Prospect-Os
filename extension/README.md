# Jacana ABI — Búsqueda asistida v2.1 (Chrome)

## Instalación / actualización

1. Descarga el ZIP del repositorio desde https://github.com/manuelortizchimal-droid/Prospect-Os/archive/refs/heads/main.zip
2. Descomprímelo en una ubicación permanente.
3. En Chrome abre `chrome://extensions/`.
4. Si está instalada la v2.0, pulsa **Remove / Quitar** en la tarjeta antigua (o usa **Update** tras reemplazar los archivos de la carpeta instalada).
5. Activa **Developer mode / Modo de desarrollador**.
6. Pulsa **Load unpacked / Cargar descomprimida** y selecciona la carpeta **extension** que contiene `manifest.json`.
7. Fija el icono Jacana desde el menú de extensiones.

## Nuevo flujo: búsqueda asistida

1. Abre la extensión y entra en **Buscar**.
2. Pulsa una de las **seis búsquedas**; se abre Facebook.
3. Revisa los resultados que Facebook te muestre. Abre el grupo o la búsqueda, desplázate a los posts que quieras inspeccionar.
4. Abre de nuevo la extensión y pulsa **Analizar pantalla actual**.
5. El motor **local** evalúa únicamente artículos que se están mostrando en esa pantalla y ordena los que tienen señales de compra.
6. Pulsa **Revisar para capturar** en un candidato; se carga en la pestaña **Capturar**.
7. **Verifica texto y enlace específico de la publicación**, y pulsa **Enviar publicación a Prospect OS**.
8. En **Oportunidades Jacana**, confirma que aparezca la captura priorizada. Registra en CRM solo un prospecto verificado y con consentimiento para seguimiento.

> Facebook cambia su interfaz. Algunos resultados no se representan como `role="article"` y no serán detectados. La lista no garantiza cobertura completa. Si no aparecen candidatos, selecciona el texto y usa la pestaña Capturar.

## Alcance de seguridad

- La extensión funciona únicamente al pulsar un botón. **No hace monitoreo en segundo plano ni scroll automático**, ni extrae miembros de grupos.
- Permisos mínimos: `activeTab` y `scripting` para leer la selección y las publicaciones visibles durante una acción explícita.
- No obtiene cookies, tokens, credenciales, ni mensajes privados.
- La clasificación usa reglas locales de texto; no es inteligencia predictiva entrenada ni confirma que la persona tenga capacidad de compra.
- La extensión **nunca envía automáticamente los resultados del análisis**. Solo se envía el candidato tras revisión manual.
- Prospect OS guarda datos en `localStorage` del perfil de Chrome y **no sincroniza dispositivos**. Haz copias periódicas usando **Datos y respaldo**.
- No copies información personal sensible o publicaciones restringidas sin autorización.
- Capturas se transfieren a Prospect OS en un fragmento de URL que la aplicación borra tras leer. No incluyas datos personales innecesarios.

## Pruebas de aceptación

- [ ] Se muestra la pestaña **Buscar** al abrir la extensión v2.1.
- [ ] Una búsqueda prediseñada abre Facebook correctamente.
- [ ] **Analizar pantalla actual** muestra candidatos cuando Facebook expone artículos visibles.
- [ ] La revisión no guarda nada en Prospect OS hasta pulsar **Enviar**.
- [ ] El texto de intención explícita se puntúa más alto que una consulta sobre rentas.
- [ ] La captura seleccionada llega a la bandeja **Oportunidades Jacana**.
- [ ] Volver a enviar exactamente la misma publicación avisa de duplicado.
- [ ] Tras recargar Prospect OS, la publicación sigue almacenada.
- [ ] **Datos y respaldo** genera un archivo de respaldo.

Pruebas realizadas en código: sintaxis, permisos, estructura del popup, siete casos de clasificación y correspondencia de IDs. **Pendiente prueba real de Chrome + Facebook**, cuya interfaz solo puede validarse con el usuario.
