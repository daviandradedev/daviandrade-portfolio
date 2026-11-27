import nextVitals from "eslint-config-next/core-web-vitals";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = [
  ...nextVitals,
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    rules: jsxA11y.flatConfigs.strict.rules,
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "*.tsbuildinfo"],
  },
];

export default eslintConfig;
