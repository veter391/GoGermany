import webp   from "gulp-webp";
import imgmin from "gulp-imagemin";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";

export const images = () => {
  return app.gulp.src(app.path.src.images)
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "Images",
      message: "Error: <%= error.message %>"
    })))
  .pipe(app.plugins.newer(app.path.build.images))

  // if is build or backend file else continue
  .pipe(app.plugins.if(app.isBuild, webp()))
  .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
  .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images)))
  .pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
  .pipe(app.plugins.if(app.isBuild, imgmin({
    progressive: true,
    svgoPlugins:[{ removeViewBox: false}],
    interlaced:true,
    optimizationLevel: 4 // 0 to 7
  })))
  .pipe(app.plugins.if(app.forBackend, webp()))
  .pipe(app.plugins.if(app.forBackend, app.gulp.dest(app.path.build.images)))
  .pipe(app.plugins.if(app.forBackend, app.gulp.src(app.path.src.images)))
  .pipe(app.plugins.if(app.forBackend, app.plugins.newer(app.path.build.images)))
  .pipe(app.plugins.if(app.forBackend, imgmin({
    progressive: true,
    svgoPlugins:[{ removeViewBox: false}],
    interlaced:true,
    optimizationLevel: 3 // 0 to 7
  })))


  // continue
  .pipe(app.gulp.dest(app.path.build.images))
  .pipe(app.gulp.src(app.path.src.svg)
    .pipe(svgmin({js2svg: {pretty: true,},}))
    .pipe(cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          // $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      }))
      .pipe(replace('&gt;', '>'))
    )
  .pipe(app.gulp.dest(app.path.build.images))
  .pipe(app.plugins.sync.stream());
}
