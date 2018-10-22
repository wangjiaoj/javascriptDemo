var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence')

// 资源
var cssSrc = './static/project/css/**/*.css',
    jsSrc = './static/project/js/**/*.js',
    imgSrc = './static/project/images/**/*',
    htmlSrc = './templates/**/*'

// 路径
var cssPath = './static/project/css',
    jsPath = './static/project/js',
    imgPath = './static/project/images',
    htmlPath = './templates'

// 处理图片
gulp.task('manageImg', function () {
    return gulp.src(imgSrc)
        .pipe($.imagemin()) // 压缩
        .pipe(gulp.dest(imgPath))
})

// 处理 CSS
gulp.task('manageCss', function () {
    return gulp.src(cssSrc)
        .pipe($.minifyCss()) // 压缩
        .pipe($.rev()) // 版本化
        .pipe(gulp.dest('./dist/css'))
        .pipe($.rev.manifest()) // 生成映射表
        .pipe(gulp.dest('./rev/css'))
})

// 处理 JS
gulp.task('manageJs', function () {
    return gulp.src(jsSrc)
        .pipe($.babel()) // babel 编译
        .pipe($.uglify()) // 压缩
        .pipe($.rev()) // 版本化
        .pipe(gulp.dest('./dist/js'))
        .pipe($.rev.manifest()) // 生成映射表
        .pipe(gulp.dest('./rev/js'))
})

// 清空原文件
gulp.task('cleanSrc', function () {
    return gulp.src([cssPath, jsPath])
        .pipe($.clean())
})

// 输入 CSS
gulp.task('inputCss', function () {
    return gulp.src('./dist/css/**/*.css')
        .pipe(gulp.dest(cssPath))
})

// 输入 JS
gulp.task('inputJs', function () {
    return gulp.src('./dist/js/**/*.js')
        .pipe(gulp.dest(jsPath))
})

// 替换路径
gulp.task('replacePath', function () {
    return gulp.src(['./rev/**/*.json', htmlSrc])
        .pipe($.revCollector())
        .pipe(gulp.dest(htmlPath))
})

// 清除中间文件
gulp.task('cleanTemp', function () {
        return gulp.src(['./dist', './rev'])
            .pipe($.clean())
    })
    // 清除中间文件
gulp.task('watch', function () {
        gulp.watch(jsSrc, ['manageJs']),
            gulp.watch(cssSrc, ['manageCss'])

    })
    // dev
gulp.task('dev', function (done) {
    runSequence( // 同步执行
        ['cleanTemp'], ['manageImg'], ['manageCss'], ['manageJs'], ['cleanSrc'], ['inputCss'], ['inputJs'], ['replacePath'], ['cleanTemp'],
        done
    )
})

// default
gulp.task('default', ['dev'])