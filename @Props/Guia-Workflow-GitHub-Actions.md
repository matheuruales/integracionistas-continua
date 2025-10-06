## Configurar CI con GitHub Actions

Esta guía te explica, de forma simple, cómo dejar un flujo de Integración Continua (CI) funcionando en este repositorio para: instalar dependencias, validar tipos, lint, ejecutar tests y construir el proyecto.

### Requisitos previos
- **Acceso al repositorio en GitHub** con permisos para habilitar Actions.
- **Archivo `package.json`** con los scripts ya definidos (este repo ya los trae):
  - `type-check`, `lint`, `test`, `build`.

### ¿Qué crea esta guía?
- Un workflow en `/.github/workflows/ci.yml` que se ejecuta en cada `push` y `pull_request` sobre `main`.
- Un artefacto con el build (`dist/`) para inspeccionar el resultado de la compilación.

### Estructura resultante
```
.github/
  workflows/
    ci.yml          # Workflow de CI
@Props/
  Guia-Workflow-GitHub-Actions.md  # Este documento
```

### Estructura del proyecto y ubicaciones de ajustes
Referencia de carpetas y archivos relevantes en este repo, con los puntos donde aplicamos cambios:

```
.
├─ .github/
│  └─ workflows/
│     ├─ ci.yml                 # [Nuevo] CI principal (Jest)
│     └─ ci-vitest.yml          # [Opcional/Nuevo] CI manual para Vitest
│
├─ @Props/
│  ├─ Guia-Workflow-GitHub-Actions.md         # [Nuevo] Esta guía (Jest)
│  └─ Guia-Workflow-GitHub-Actions-Vitest.md  # [Nuevo] Guía alternativa (Vitest)
│
├─ src/
│  ├─ setupTests.ts             # Setup de tests (usado por Jest)
│  ├─ components/               # Componentes React y sus tests
│  ├─ views/                    # Vistas React
│  └─ ...
│
├─ eslint.config.js             # [Nuevo] ESLint v9 flat config (overrides DOM/Jest/Node)
├─ jest.config.js               # Config de Jest en ESM (mapeos, jsdom, ts-jest)
├─ postcss.config.cjs           # Config CommonJS (marcada como CJS en ESLint)
├─ package.json                 # Scripts: type-check, lint, test, build
└─ ...
```

AJUSTES REALIZADOS:
- `.github/workflows/ci.yml`: agregado workflow de CI (instala, type-check, lint, test, build, artefacto).
- `eslint.config.js`: agregado y configurado para ESLint 9 (globals DOM/Jest, override CJS para `postcss.config.cjs`, ESM para configs `.js`).
- `@Props/Guia-Workflow-GitHub-Actions.md`: creada y ampliada con checklist, tabla de pasos y bitácora de incidencias.
- `.github/workflows/ci-vitest.yml`: agregado workflow manual alternativo para proyectos con Vitest.
- `@Props/Guia-Workflow-GitHub-Actions-Vitest.md`: creada guía paralela para quienes usan Vitest (globals `vi`, jsdom, etc.).

### Archivo del workflow (ci.yml)
Copiar/pegar si lo necesitas, aunque ya está creado por esta guía en el repositorio:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-and-test:
    name: Build & Test
    runs-on: ubuntu-latest
    permissions:
      contents: read
    env:
      CI: true
    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: npm

      - name: Install dependencies (npm ci)
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Run tests (Jest)
        run: npm test -- --ci

      - name: Build
        run: npm run build

      - name: Upload production build (artifact)
        if: success()
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist
```

### ¿Qué hace cada paso?

| Paso | ¿Qué hace? | Script/Comando | Herramienta |
|---|---|---|---|
| Instalar dependencias | Instala usando el `package-lock.json` para garantizar builds reproducibles | `npm ci` | npm |
| Validar tipos | Verifica tipos sin emitir archivos (detecta errores de TypeScript) | `npm run type-check` (`tsc --noEmit`) | TypeScript |
| Lint | Analiza el código y falla si hay errores de estilo/reglas | `npm run lint` (ESLint v9 flat config) | ESLint |
| Ejecutar tests | Ejecuta las pruebas en modo CI | `npm test -- --ci` | Jest |
| Construir el proyecto | Compila a producción y genera la carpeta `dist/` | `npm run build` (`vite build`) | Vite |

Notas:
- Antes de estos pasos, el runner hace: `Checkout` (descarga el repo) y `Setup Node` (define versión de Node y cachea npm).
- Después del build, se sube `dist/` como artefacto para descargarlo desde la corrida.

### Paso a paso (checklist)
1) Confirmar archivos y scripts
   - Verifica que existan:
     - `.github/workflows/ci.yml`
     - `eslint.config.js`
   - En `package.json` deben existir scripts: `type-check`, `lint`, `test`, `build`.

2) Activar y ejecutar el workflow
   - Haz `git push` a `main` o abre un PR.
   - En GitHub → `Actions` → verás el workflow `CI` ejecutándose.
   - Entra a la corrida para revisar los pasos y sus logs.
   - Para reintentar: `Actions` → selecciona la corrida → `Re-run jobs`.

3) Revisar artefacto de build
   - En la página de la corrida, al final busca `Artifacts` y descarga `dist`.

### Pasos detallados en la interfaz de GitHub Actions
1. Habilitar Actions (si el repositorio es nuevo):
   - Ve a `Actions` → si aparece un aviso “Workflows aren’t being run…”, pulsa `I understand my workflows, go ahead and enable them`.
2. Forzar una ejecución manual (opcional):
   - Realiza un cambio mínimo (por ejemplo, en `README.md`), `git add .`, `git commit`, `git push` para disparar el workflow.
3. Revisar una corrida:
   - `Actions` → selecciona la corrida más reciente → entra al job `Build & Test`.
   - Expande cada paso para ver logs. Busca mensajes de error en rojo si falla.
4. Descargar artefactos:
   - En la vista de la corrida, al final verás `Artifacts` → descarga `dist`.
5. Agregar badge de estado al README (opcional):
   - En `Actions` → `CI` → botón `…` → `Create status badge` → copia el markdown y pégalo en `README.md`.
6. Proteger la rama `main` (recomendado):
   - `Settings` → `Branches` → `Add branch protection rule`.
   - `Branch name pattern`: `main`.
   - Marca `Require status checks to pass before merging` y selecciona `CI / Build & Test`.
   - Guarda. Así evitarás merges si la CI falla.

### Personalizaciones útiles
- **Node**: cambia la matriz a otra versión, por ejemplo `18.x` o `22.x`:
  ```yaml
  strategy:
    matrix:
      node-version: [18.x, 20.x, 22.x]
  ```
- **Ramas**: ajusta los disparadores (`on`) para otras ramas o solo PRs.
- **Caché**: ya está activado para npm vía `actions/setup-node@v4`.
- **Artefacto**: si no quieres subir `dist/`, elimina el paso de `upload-artifact`.

### Compatibilidad de Node (para estudiantes)
Si tu máquina tiene una versión diferente de Node a la usada en CI (20.x por defecto), puedes:

- Actualizar tu Node local a la recomendada (ej. 20.x). Con `nvm`:
  - Instala `nvm` y luego: `nvm install 20` y `nvm use 20`.
- Usar `.nvmrc` para seleccionar la versión automáticamente: `nvm use`.
- Ajustar la matriz del workflow para probar más versiones de Node:
  ```yaml
  strategy:
    matrix:
      node-version: [18.x, 20.x, 22.x]
  ```
- Añadir en `package.json` el campo `engines` para comunicar la versión mínima:
  ```json
  {
    "engines": {
      "node": ">=18.18.0"
    }
  }
  ```

Recomendación: mantener local y CI en la misma versión (por ejemplo, 20.x) para evitar diferencias de comportamiento.

### Problemas frecuentes y soluciones
- **Fallan los tests sin tests presentes**: este repo usa `"jest --passWithNoTests"` en `npm test`, así no falla si no hay specs.
- **Errores de ESLint**: corrige con `npm run lint` y `npm run format`, luego vuelve a hacer push.
- **Falla el type-check**: ejecuta `npm run type-check` localmente y corrige los tipos.

### Comandos locales útiles
- **Instalar**: `npm ci`
- **Type check**: `npm run type-check`
- **Lint**: `npm run lint`
- **Tests**: `npm test`
- **Build**: `npm run build`

Con esto, tu CI queda listo: cada cambio validará automáticamente la calidad y el build del proyecto.

### Si falla… (bitácora de incidencias)
Usa esta sección como guía rápida. Busca el mensaje que te sale y aplica la solución.

1) ESLint 9 no encuentra configuración
- Mensaje: `ESLint couldn't find an eslint.config.(js|mjs|cjs) file.`
- Causa: A partir de ESLint v9, se usa configuración flat `eslint.config.js`.
- Solución aplicada:
  1. Crear `eslint.config.js` en la raíz del repo con configuración flat para JS/TS.
  2. Corregir sintaxis en la clave `files` (coma en lugar de punto y coma).
  3. Reintentar el workflow en GitHub: `Actions` → seleccionar corrida fallida → `Re-run jobs`.
- Resultado esperado: el paso `Lint` deja de fallar por falta de config. Si fallan reglas, ajustar el código o reglas.

2) Lint falla con `no-undef` en tests, DOM o archivos de config
- Mensajes típicos: `'test' is not defined`, `'document' is not defined`, `'module' is not defined`.
- Causa: faltan globals/entornos (Jest, DOM, Node) en la configuración de ESLint.
- Solución aplicada:
  1. Actualizar `eslint.config.js`:
     - Añadir globals de navegador/DOM para TS/TSX.
     - Desactivar `no-undef` en TS y en tests.
     - Crear overrides para `*.test.ts(x)` y `src/setupTests.ts` con globals de Jest.
     - Crear override para archivos de configuración (`postcss.config.cjs`, `jest.config.js`, `*.config.*`) con globals de Node/CommonJS.
  2. Reintentar el workflow: `Actions` → corrida → `Re-run jobs`.
- Resultado esperado: el paso `Lint` reconoce los entornos correctos y solo reporta problemas reales de estilo.

3) Parsing error en configs: `'import' and 'export' may appear only with sourceType: module`
- Resultado esperado: desaparece el parsing error en esos archivos.

4) ¿Sigue fallando el lint por reglas de estilo?
- Ejecuta localmente:
  - `npm run lint` para ver los errores exactos
  - `npm run format` para autoformatear
- Si el error es válido (no falso positivo), corrige el código. Si es un falso positivo, evalúa ajustar reglas puntualmente en `eslint.config.js`.
- Causa: ESLint interpretaba `eslint.config.js` y `jest.config.js` como CommonJS.
- Solución aplicada:
  1. En `eslint.config.js`, separar overrides:
     - `postcss.config.cjs` → `sourceType: commonjs` y globals Node.
     - `eslint.config.js` y `jest.config.js` → `sourceType: module`.
  2. Reintentar el workflow en `Actions` → `Re-run jobs`.
- Resultado esperado: desaparece el parsing error en esos archivos.

