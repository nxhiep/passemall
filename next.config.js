const withManifest = require('./node_modules/next-manifest');

module.exports = withManifest({
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }

        return config
    },
    manifest: {
        output: './public/',
        short_name: "ABC Learning",
        name: 'ABC Learning',
        icons: [
            {
                src: "logo60.png",
                type: "image/png",
                sizes: "55x55"
            },
            {
                src: "logo192.png",
                type: "image/png",
                sizes: "192x192"
            },
            {
                src: "logo512.png",
                type: "image/png",
                sizes: "512x512"
            }
        ],
        start_url: "/?source=pwa",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff"
    }
})