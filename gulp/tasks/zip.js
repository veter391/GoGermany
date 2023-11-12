import { deleteAsync } from 'del';
import zipPlug from "gulp-zip";

export const zip = () => {
  deleteAsync(`./${app.path.rootFolder}.zip`);
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
  .pipe(app.plugins.plumber(
    app.plugins.notify.onError({
      title: "Zip",
      message: "Error: <%= error.message %>"
    })))
  .pipe(zipPlug(`${app.path.rootFolder}.zip`))
  .pipe(app.gulp.dest('./'));
}

