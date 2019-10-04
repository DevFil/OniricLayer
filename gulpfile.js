const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('rest/tsconfig.json');
let distDir = './dist/build';
let distWebLibs = distDir+'/web/'
let projectServerDir = './rest';
let projectLibs = projectServerDir + '/web/';
gulp.task('compile',() => {
    let tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(distDir));
});
gulp.task('move',() => {
    return gulp.src(projectLibs+'**').pipe(gulp.dest(distWebLibs))
});
gulp.task('moveconf',() => {
    return gulp.src(projectServerDir+'/config.json').pipe(gulp.dest(distDir))
});
gulp.task('watch_typescript', () => {
    let typescriptPath = projectServerDir+'**/*.*';
    return gulp.watch(typescriptPath, gulp.series(['default']));
});
gulp.task('dev', gulp.parallel(['watch_typescript']));
gulp.task('default', gulp.series(['moveconf','move','compile']));