/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colour Pallette
        "vela-darkest-blue": "#031019",
        "vela-dark-blue": "#0e1d29",
        "vela-orange": "#fc5f1e",
        "vela-grey": "#999C9F",
        "vela-lighter-grey": "#f5f5f5",
        "vela-white": "#ffffff",

        // Secondary Colour Pallette
        "vela-red": "#b90909",
        "vela-light-orange": "#ffa983",
        "vela-yellow": "#f5bd4f",
        "vela-green": "#61c454",
        "vela-blue": "#01a9e1",
        "vela-lighter-blue": "#95cecf",

        "vela-light-mode-card": "#FFFBFA",
        "vela-light-mode-drawer": "#FFE1D4",


        "l-background": "var(--vela-white)",
        "l-background-drawer": "var(--vela-light-mode-drawer)",
        "l-background-card": "var(--vela-light-mode-card)",
        "l-text-color": "var(--vela-darkest-blue)",
        "l-modal-background": "var(--vela-lighter-grey)",
        "l-chat-bubble": "var(--vela-light-mode-drawer)",
        "l-modal-text-color": "var(--vela-darkest-blue)",
        "l-on-chat-bubble": "var(--vela-darkest-blue)",
        "l-drawer-outline": "var(--vela-dark-blue)",


        "l-selected-tab": "#dddddd",
        "l-backgroud-tab": "#FFFFFF",


        "d-background": "var(--vela-darkest-blue)",
        "d-background-drawer": "var(--vela-dark-blue)",
        "d-background-card": "var(--vela-dark-blue)",
        "d-text-color": "var(--vela-white)",
        "d-modal-background": "var(--vela-dark-blue)",
        "d-chat-bubble": "var(--vela-darkest-blue)",
        "d-modal-text-color": "var(--vela-white)",
        "d-on-chat-bubble": "var(--vela-white)",
        "d-drawer-outline": "var(--vela-light-orange)",

        "d-selected-tab": "#B6C0C5",
        "d-backgroud-tab": "#5C5D5E",

        "vela-background": "var(--vela-background)",
        "vela-background-drawer": "var(--vela-background-drawer)",
        "vela-background-card": "var(--vela-background-card)",
        "vela-text-color": "var(--vela-text-color)",
        "vela-modal-background": "var(--vela-modal-background)",
        "vela-chat-bubble": "var(--vela-chat-bubble)",
        "vela-modal-text-color": "var(--vela-modal-text-color)",
        "vela-on-chat-bubble": "var(--vela-on-chat-bubble)",
        "vela-drawer-outline": "var(--vela-drawer-outline)",


        "th-selected-tab": "var(--selected-tab)",
        "th-background-tab": "var(--background-tab)",
      },
    },
  },
  plugins: [],
};
