/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat']
    },
    colors: {
      'light-green': '#76FFBA',
      'subtle-gray': '#ECECEC'
    },
    backgroundImage: {
      'background': "url('../public/img/staverse-background.png')",
      'backblur': "url('../public/img/back-blur.png')",
      'createIcon': "url('../public/img/create-icon.png')",
      'arrow': "url('../public/img/arrow.png')",
      'checkIcon': "url('../public/img/check-icon.png')",
      'sendIcon': "url('../public/img/send-icon.png')",
      'ETHBogota': "url('../public/img/ETHBogota-bg.png')",
      'ETHSanFrancisco': "url('../public/img/ETHSanFrancisco.png')",
      'stay1': "url('../public/img/stay-1.png')",
      'stay2': "url('../public/img/stay-2.png')",
      'stay3': "url('../public/img/stay-3.png')",
      'dimmedBackground': "url('../public/img/background-dim-long.png')",
      'NYCProfile': "url('../public/img/NYC_profile.jpg')",
      'guarantee': "url('../public/img/guarantee.png')",
      'USDC': "url('../public/img/USDC.png')",
      'staySuccess': "url('../public/img/stay-success.png')"
    },
    spacing: {
      '32': '32rem',
    },
    margin: {
      '30rem': '30rem',
    }
    },
  },
  plugins: [],
}