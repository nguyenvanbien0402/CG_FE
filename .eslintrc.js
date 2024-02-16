// https://eslint.org/docs/user-guide/configuring

module.exports = {
  // parser: "vue-eslint-parser",
  // parserOptions: {
  //   parser: "babel-eslint",
  //   sourceType: "module"
  // },
  // globals: {
  //   "$": true,
  // },
  extends: [
    'plugin:vue/vue3-recommended',
    // 'eslint:recommended',
    // 'plugin:vue/essential',
    // 'plugin:vue/recommended',
    // 'plugin:vue/strongly-recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/html-self-closing": "off",
    // "vue/html-self-closing": [
    //   "error", {
    //     "html": {
    //       "void": "never",
    //       "normal": "never",
    //       "component": "any"
    //     },
    //     "svg": "any",
    //     "math": "any"
    //   }
    // ],
    "vue/v-on-event-hyphenation": "off",
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-prop-type-constructor": "off",
    "vue/multi-word-component-names": "off",
    "vue/html-closing-bracket-spacing": "off",
    "vue/first-attribute-linebreak": "off",
    "vue/valid-v-slot": "off",
    "no-unused-vars": "warn",
    "no-debugger":"warn"
  },
  env: {
    node: true,
  }
};
