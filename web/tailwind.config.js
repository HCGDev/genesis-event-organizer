const colors = require('tailwindcss/colors')

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', ' sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(red|green|blue|yellow|gray)-(300|400|500|700)/,
    },
    {
      pattern: /hover:bg-(red|green|blue|yellow|gray)-(300|400|500|700)/,
    },
    {
      pattern: /(mr|mt|ml|mb|m|my|mx)-(1|2|3|4)/,
    },
    {
      pattern: /(px|py|p|pr|pl|pt|pb)-(2|4|6|8)/,
    },
    {
      pattern: /(h|w)-(12|14|16|20)/,
    },
  ],
}
