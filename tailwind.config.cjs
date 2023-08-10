/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "bgColor":"var(--bgColor)",
        "mainColor":"var(--mainColor)",
        "complementary":"var(--complementary)",
        "fg":"var(--fg)",
        "complementaryFG":"var(--complementaryFG)"
      },
      fontSize : {
        "smallerText":"0.5rem",
        "smallText":"0.8rem",
        "mediumText":"1rem",
        "bigText":"1.5rem",
        "massiveText":"2rem",
      },
      fontFamily: {
        "mainFont":"Arial, Helvetica",
        "logoFont":"Righteous, sans-serif"
      },
    },
  },

  plugins: [],
};

module.exports = config;
