const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpack = new htmlWebpackPlugin({
    template : './assets/index.template.html',
    filename : 'index.html'

});

module.exports = {
    // Punto de entrada
    entry  :  './assets/javascript/entry.js',
    // Salidas
    output : {
        publicPath : '/',
        path       : path.join(__dirname, '..'),
        filename   : 'dist/javascript/bundle.js',
    },
    devServer: {
        inline: true,
        port: 9090
    },
    plugins : [htmlWebpack],
    module : {
        rules : [
            {
                test : /\.scss$/,
                //style tag  = style-loader
                //style css  = css-loader
                //sass a css = sass-loader
                use : ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 5000
                    }
                  }
                ]
              }
        ]
    }
}