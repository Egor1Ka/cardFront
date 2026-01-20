/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          from: { height: "0", opacity: "0" },
          to: {
            height: "var(--reka-collapsible-content-height)",
            opacity: "1",
          },
        },
        slideUp: {
          from: {
            height: "var(--reka-collapsible-content-height)",
            opacity: "1",
          },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        slideDown: "slideDown 260ms ease-out",
        slideUp: "slideUp 220ms ease-in",
      },
    },
  },
  plugins: [],
};
