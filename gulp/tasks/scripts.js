import webpack from "webpack-stream";

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "JS Scripts",
      message: "Error: <%= error.message %>"
    })
  ))
  // add webpack module for import and export files from differents folders
  .pipe(webpack({
    mode: app.isDev ? 'development' : 'production', // develop and production.. mode (root mode)
    output: {
      filename: 'script.min.js', // result(end)
    }
  }))
  .pipe(app.gulp.dest(app.path.build.js))
    // adding minify js file if is backend version
  .pipe(app.plugins.if(app.forBackend, app.gulp.src(app.path.src.js)))
  .pipe(app.plugins.if(app.forBackend, webpack({
    mode:'development', // develop and production.. mode (root mode)
    output: {
      filename: 'script.js', // result(end)
    },
    module: {
      rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: "defaults"
              }]
            ]
          }
        }
      }]
    },
    devtool: false
  })))
  .pipe(app.plugins.if(app.forBackend, app.gulp.dest(app.path.build.js)))
  .pipe(app.plugins.sync.stream());
}

