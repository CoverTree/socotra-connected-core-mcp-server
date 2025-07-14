/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["eslint-config-custom/index.js"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
