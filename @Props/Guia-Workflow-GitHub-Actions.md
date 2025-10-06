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
2. Ve a `Actions` en GitHub y selecciona el workflow `CI`.
3. Observa la corrida: vas a ver los pasos y sus logs en tiempo real.

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

