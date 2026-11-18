import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "*.tsbuildinfo"],
  },
];

export default eslintConfig;
