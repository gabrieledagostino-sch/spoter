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
        "complementaryFG":"var(--complementaryFG)",
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
        "logoFont":"Righteous, sans-serif",
      },
      backgroundImage : {
        "glow":"radial-gradient(ellipse at center, white 0%, transparent 70%);",
        "select":"linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)",
        "select-black":"linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.3) 50%, rgba(0,0,0,0) 100%)",
      }
    },
  },

  plugins: [],
};

module.exports = config;
