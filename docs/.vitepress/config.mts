import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "..\\assets",

  title: "RpDocs",
  description: "Full documentation for resourcepacks makers",

  locales: {
    root: {
      label: "English",
      lang: "en",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Folders",
        items: [
          {
            text: "Atlases",
            items: [
              { text: "Основа", link: "/atlases/main" },
            ],
          },
          {
            text: "BlockStates",
            items: [
              { text: "Основа", link: "/blockstates/main" },
            ],
          },
          {
            text: "Equipment",
            items: [
              { text: "Основа", link: "/equipment/main" },
            ],
          },
          {
            text: "Font",
            items: [
              { text: "Основа", link: "/font/main" },
            ],
          },
          {
            text: "Items",
            items: [
              { text: "Основа", link: "/items/main" },
              {
                text: "Types",
                items: [
                  { text: "Основа", link: "/items/main" },
                  { text: "Общее", link: "/items/main" },
                ],
              },
            ],
          },
          {
            text: "Lang",
            items: [
              { text: "Основа", link: "/lang/main" },
            ],
          },
          {
            text: "Models",
            items: [
              { text: "Основа", link: "/models/main" },
            ],
          },
          {
            text: "Particles",
            items: [
              { text: "Основа", link: "/particles/main" },
            ],
          },
          {
            text: "post_effect",
            items: [
              { text: "Основа", link: "/post_effect/main" },
            ],
          },
          {
            text: "Shaders",
            items: [
              { text: "Основа", link: "/shader/main" },
            ],
          },
          {
            text: "Sounds",
            items: [
              { text: "Основа", link: "/sounds/main" },
            ],
          },
          {
            text: "Texts",
            items: [
              { text: "Основа", link: "/texts/main" },
            ],
          },
          {
            text: "Textures",
            items: [
              { text: "Основа", link: "/textures/main" },
            ],
          },
          {
            text: "waypoint_style",
            items: [
              { text: "Основа", link: "/waypoint_style/main" },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
    },
    ru: {
      label: "Русский",
      lang: "ru", // необязательный, будет добавлен как атрибут `lang` в тег `html`
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/ru/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Folders",
        items: [
          {
            text: "Atlases",
            items: [
              { text: "Основа", link: "/ru/atlases/main" },
            ],
          },
          {
            text: "BlockStates",
            items: [
              { text: "Основа", link: "/ru/blockstates/main" },
            ],
          },
          {
            text: "Equipment",
            items: [
              { text: "Основа", link: "/ru/equipment/main" },
            ],
          },
          {
            text: "Font",
            items: [
              { text: "Основа", link: "/ru/font/main" },
            ],
          },
          {
            text: "Items",
            items: [
              { text: "Основа", link: "/ru/items/main" },
              {
                text: "Types",
                items: [
                  { text: "Основа", link: "/ru/items/main" },
                  { text: "Общее", link: "/ru/items/main" },
                ],
              },
            ],
          },
          {
            text: "Lang",
            items: [
              { text: "Основа", link: "/ru/lang/main" },
            ],
          },
          {
            text: "Models",
            items: [
              { text: "Основа", link: "/ru/models/main" },
            ],
          },
          {
            text: "Particles",
            items: [
              { text: "Основа", link: "/ru/particles/main" },
            ],
          },
          {
            text: "post_effect",
            items: [
              { text: "Основа", link: "/ru/post_effect/main" },
            ],
          },
          {
            text: "Shaders",
            items: [
              { text: "Основа", link: "/ru/shader/main" },
            ],
          },
          {
            text: "Sounds",
            items: [
              { text: "Основа", link: "/ru/sounds/main" },
            ],
          },
          {
            text: "Texts",
            items: [
              { text: "Основа", link: "/ru/texts/main" },
            ],
          },
          {
            text: "Textures",
            items: [
              { text: "Основа", link: "/ru/textures/main" },
            ],
          },
          {
            text: "waypoint_style",
            items: [
              { text: "Основа", link: "/ru/waypoint_style/main" },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
    },
  },
});
