const { defineConfig } = require("@vue/cli-service");
const ScriptSetup = require("unplugin-vue2-script-setup/webpack").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const outputPath =
  process.env.VUE_APP_ENV === "express"
    ? "../express/public"
    : process.env.VUE_APP_ENV === "laravel"
    ? "../laravel/public"
    : "build";

const laraveWebpackPlugin =process.env.VUE_APP_ENV === "laravel"
        ? [
            new CopyWebpackPlugin({
              patterns: [
                {
                  from: "./index.php",
                  to: "",
                },
              ],
            }),
          ]
        : [];

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: outputPath,
  parallel: false,
  configureWebpack: {
    plugins:[ ScriptSetup({ /* options */ }),...laraveWebpackPlugin]
      
  },
  devServer: {
    port: 8080,
    open: false,
    host: "localhost",
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    },
  },
});
