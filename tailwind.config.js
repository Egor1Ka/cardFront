/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          from: { height: "0", opacity: "0", transform: "translateY(-4px)" },
          to: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUp: {
          from: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
            transform: "translateY(0)",
          },
          to: { height: "0", opacity: "0", transform: "translateY(-4px)" },
        },
      },
      animation: {
        slideDown: "slideDown 5s ease-in-out",
        slideUp: "slideUp 5s ease-in-out",
      },
    },
  },
  plugins: [],
};
