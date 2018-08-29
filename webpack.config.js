/*
 ./webpack.config.js
*/
const path = require('path'); // path utility

const config = {
 entry: './src/index.js', // archivo de entrada
 output: {
  path: path.resolve('./public/js'), //resolver el path de salida
  filename: 'bundle.js' // archivo js compilado
 },
 module: {
  rules: [
   {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: ["env","react","stage-0"]
    }
   },
   {
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets : ["env","react","stage-0"]
      }
    },
    {
      test: /\.css$/,
      exclude: /prismjs/,
      use: [{ loader: "style-loader" }, { loader: "css-loader" }]
    },
    {
      test: /\.(gif|jpg|png|ico)$/,
      use: [
        {
          loader: "url-loader"
        }
      ]
    },
    {
      test: /\.svg$/,
      use: [
        {
          loader: "babel-loader"
        },
        {
          loader: "react-svg-loader",
          options: {
            jsx: true // true outputs JSX tags
          }
        }
      ]
    }
  ]
 },
 resolve: {
  extensions: ['.js', '.jsx']
 },
 watch: true,
 watchOptions: {
  ignored: /node_modules/
},
 plugins: [] // configuración de nuestra vista
}
module.exports = config; //exportamos a webpack nuestra configuración
