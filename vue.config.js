const path = require('path');
const fs = require('fs');
const join = path.join;//拼接路径
function resolve(dir) {
    return path.resolve(__dirname, dir)
}

function getEntries(path) {
    let files = fs.readdirSync(resolve(path));
    const entries = files.reduce((ret, item) => {
        const itemPath = join(path, item)
        const isDir = fs.statSync(itemPath).isDirectory();
        if (isDir) {
            ret[item] = resolve(join(itemPath, 'index.js'))
        } else {
            const [name] = item.split('.')
            ret[name] = resolve(`${itemPath}`)
        }
        return ret
    }, {})
    return entries
}

//开发环境配置
const devConfig = {
    productionSourceMap: false, //不生成map文件
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: config => {
        config.externals = {
            //video.js 作为外部资源引入
            'video.js': 'videojs'
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: [
                        './node_modules/js-mixin-utils/css/mixins.scss'
                    ]
                })
                .end()
        })
    }
}
const buildConfig = {
    productionSourceMap: false, //不生成map文件
    outputDir: 'lib',
    css: {
        sourceMap: true,
        extract: {
            filename: '[name]/style.css'//在lib文件夹中建立style文件夹中，生成对应的css文件。
        }
    },
    configureWebpack: {
        entry: {
            ...getEntries('packages'),
        },
        output: {
            filename: '[name]/index.js',
            libraryTarget: 'commonjs2',
        },
        externals: {
            //video.js 作为外部资源引入
            'video.js': 'videojs'
        }
    },
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
        config.plugins.delete('copy')
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.plugins.delete('hmr')
        config.entryPoints.delete('app');
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: [
                        './node_modules/js-mixin-utils/css/mixins.scss'
                    ]
                })
                .end()
        })
    }
}
module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig;
