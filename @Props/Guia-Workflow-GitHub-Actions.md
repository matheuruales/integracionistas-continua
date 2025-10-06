## Guía paso a paso: Configurar CI con GitHub Actions

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
- **Checkout**: descarga el código del repo para que el runner lo use.
- **Setup Node**: selecciona la versión de Node y habilita caché de npm (más rápido).
- **npm ci**: instala dependencias usando `package-lock.json` para builds reproducibles.
- **Type check**: ejecuta `tsc --noEmit` (detecta errores de tipos).
- **Lint**: corre ESLint y falla el build si hay errores.
- **Tests**: ejecuta Jest en modo CI. Este repo ya tiene `jest` configurado.
- **Build**: ejecuta `vite build` y genera `dist/`.
- **Upload artifact**: adjunta `dist/` a la corrida, útil para descargar y probar.

### ¿Cómo se activa?
1. Sube (`git push`) los cambios a `main` o abre un **Pull Request**.
2. En GitHub, entra al repositorio y haz clic en `Actions`.
3. Verás el workflow `CI` listado. Al hacer push o abrir un PR, se ejecutará automáticamente.
4. Ingresa a la corrida para ver los pasos, tiempos y logs. Si un paso falla, GitHub marcará el job en rojo y mostrará el error.
5. En la pestaña `Artifacts` (al final de la corrida), descarga `dist` para revisar el build.

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
      node-version: [20.x, 22.x]
  ```
- **Ramas**: ajusta los disparadores (`on`) para otras ramas o solo PRs.
- **Caché**: ya está activado para npm vía `actions/setup-node@v4`.
- **Artefacto**: si no quieres subir `dist/`, elimina el paso de `upload-artifact`.

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

### Bitácora de incidencias (para estudiantes)
Registro de problemas encontrados y su solución, para que puedas replicar los pasos:

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
- Causa: ESLint interpretaba `eslint.config.js` y `jest.config.js` como CommonJS.
- Solución aplicada:
  1. En `eslint.config.js`, separar overrides:
     - `postcss.config.cjs` → `sourceType: commonjs` y globals Node.
     - `eslint.config.js` y `jest.config.js` → `sourceType: module`.
  2. Reintentar el workflow en `Actions` → `Re-run jobs`.
- Resultado esperado: desaparece el parsing error en esos archivos.

