const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        crypto: require.resolve("crypto-browserify"),
        fs: false,
       // assert: false,
        util: false,
        path: false,
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        zlib: require.resolve('browserify-zlib'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}