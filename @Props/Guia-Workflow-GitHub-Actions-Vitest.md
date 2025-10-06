## Guía paso a paso: CI con GitHub Actions usando Vitest

Esta guía es para estudiantes que configuraron pruebas con Vitest en lugar de Jest. Explica los cambios en la configuración, errores típicos que verás y cómo resolverlos.

### Requisitos
- Scripts en `package.json` (ejemplo):
  - `"test": "vitest run --reporter=dot"`
  - `"type-check": "tsc --noEmit"`
  - `"lint": "eslint . --ext .ts,.tsx --report-unused-disable-directives --max-warnings 0"`
  - `"build": "vite build"`

### Archivo de workflow (opcional separado)
Usa este workflow si quieres separar la ejecución con Vitest. Se dispara manualmente.

```yaml
name: CI (Vitest)

on:
  workflow_dispatch: {}

jobs:
  build-and-test-vitest:
    runs-on: ubuntu-latest
    env:
      CI: true
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies (npm ci)
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Run tests (Vitest)
        run: npm test -- --run

      - name: Build
        run: npm run build

      - name: Upload dist artifact
        if: success()
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist
```

### Cambios en ESLint (Vitest)
- Añade la global `vi` (y si usas APIs como `describe`, `it`, `expect` provistas por Vitest, también se cubren como globals en los overrides de tests):

```js
// En eslint.config.js → override de tests
{
  files: ["**/*.test.ts", "**/*.test.tsx", "src/setupTests.ts"],
  languageOptions: {
    globals: {
      describe: "readonly",
      test: "readonly",
      it: "readonly",
      expect: "readonly",
      beforeEach: "readonly",
      afterEach: "readonly",
      vi: "readonly",
      window: "readonly",
      document: "readonly",
    },
  },
  rules: { "no-undef": "off" },
}
```

### Errores comunes y soluciones
1) `no-undef` para `describe`, `it`, `expect`, `vi`
   - Motivo: faltan globals para Vitest en ESLint.
   - Solución: agregar `vi` y los demás globals al override de tests.

2) `document/window` no definidos en tests
   - Motivo: tests que dependen de DOM sin entorno jsdom.
   - Solución: ejecuta Vitest con entorno jsdom. Opciones:
     - `vitest.config.ts` con `test: { environment: 'jsdom' }`
     - o usar `--environment jsdom` al correr `vitest`.

3) Incompatibilidades ESM/CJS en configs
   - Sigue la misma pauta de la guía principal: trata `postcss.config.cjs` como CJS y configs `.js` como ESM.

### Paso a paso (checklist Vitest)
1. Verifica scripts `test`, `type-check`, `lint`, `build` en `package.json`.
2. Ajusta `eslint.config.js` con globals de Vitest (`vi`) en overrides de tests.
3. Configura jsdom para los tests si el DOM es necesario.
4. Ejecuta el workflow Vitest (`Actions` → `CI (Vitest)` → `Run workflow`).
5. Revisa logs y el artefacto `dist`.

Con esto, quienes usaron Vitest pueden ejecutar la CI sin conflictos con la guía principal basada en Jest.

