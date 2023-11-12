import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";
import svgSprite from "gulp-svg-sprite";

export const spriteSvg = () => {
  return app.gulp.src(app.path.src.sprite, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "Svg Sprite",
      message: "Error: <%= error.message %>"
    })
  ))
  .pipe(svgmin({js2svg: {pretty: true,},}))
  .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      },
    }))
  .pipe(replace('&gt;', '>'))
  .pipe(svgSprite({
    mode:{
      stack: {
        sprite: `../sprite.svg`,
        // create page and icons
        example: true
      }
    },
  }))
  .pipe(app.gulp.dest(`${app.path.build.images}`));
}
