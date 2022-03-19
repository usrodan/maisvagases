 
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'], 
  theme: {filter: { // defaults to {}
  'none': 'none',
  'grayscale': 'grayscale(1)',
  'invert': 'invert(1)',
  'sepia': 'sepia(1)',
},
backdropFilter: { // defaults to {}
  'none': 'none',
  'blur': 'blur(20px)',
},
    extend: {
      colors: { 
        "textAlternative": "#ccc",
        "textSecondary": "#696969",
        "dark": "#000534",
        "textOnDark":"#F4F5F9",
        "backgroundSecondary":  "#fafafa",
        "facebook": "#39569C",
        "linkedin": "#0079B5",
        "telegram": "#0088CC",
        "twitter" : "#01A9F2",
        "whatsapp": "#25D366",
        "instagram": "#E1306C", 
        "copy": "#001638",


        "vermelho": "#E02525",
        "verdinho": "#5FA900",
        
        "primary": "#001638",
        "primaryShade": "#00255e",
        "secondary": "#0FA3C9",
        "secondaryShade": "#0FA3C9",
        "primaryAlternative": "#DC7396",
        "primaryAlternativeShade": "#A62953",
         
      },
    },
  },
  variants: {
    filter: ['responsive'], // defaults to ['responsive']
    backdropFilter: ['responsive'], // defaults to ['responsive']
    extend: {},
  },
  plugins: [ 
    require('tailwindcss-filters')
  ],
}
