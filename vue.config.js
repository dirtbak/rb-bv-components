module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
          @import "@/scss/_variables.scss";
        `
            }
        }
    },
    chainWebpack: config => config.resolve.symlinks(false)
}
