module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
@import "@/scss/_functions.scss";
@import "@/scss/_mixins.scss";
@import "@/scss/_variables.scss";
        `
            }
        }
    },
    chainWebpack: config => config.resolve.symlinks(false)
}
