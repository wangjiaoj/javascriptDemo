var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence');
var replace = require('gulp-replace-path');
var sass = require('gulp-sass'); // 编译scss
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

var sassSrc = './static/source/**/*.scss';
// 处理图片
gulp.task('manageImg', function() {
    return gulp.src(imgSrc)
        .pipe($.imagemin()) // 压缩
        .pipe(gulp.dest(imgPath))
})

// 处理 CSS
gulp.task('manageCss', function() {
    return gulp.src(cssSrc)
        .pipe($.minifyCss()) // 压缩
        .pipe($.rev()) // 版本化
        .pipe(gulp.dest('./dist/css'))
        .pipe($.rev.manifest()) // 生成映射表
        .pipe(gulp.dest('./rev/css'))
})

// 处理 JS
gulp.task('manageJs', function() {
    return gulp.src(jsSrc)
        .pipe($.babel()) // babel 编译
        .pipe($.uglify()) // 压缩
        .pipe($.rev()) // 版本化
        .pipe(gulp.dest('./dist/js'))
        .pipe($.rev.manifest()) // 生成映射表
        .pipe(gulp.dest('./rev/js'))
})



//清空原文件
gulp.task('cleanSrc', function() {
    return gulp.src([cssPath, jsPath])
        .pipe($.clean())
})

// 输入 CSS
gulp.task('inputCss', function() {
    return gulp.src('./dist/css/**/*.css')
        .pipe(gulp.dest(cssPath))
})

// 输入 JS
gulp.task('inputJs', function() {
    return gulp.src('./dist/js/**/*.js')
        .pipe(gulp.dest(jsPath))
})

// 替换路径
gulp.task('replacePath', function() {
    return gulp.src(['./rev/**/*.json', htmlSrc])
        .pipe($.revCollector())
        .pipe(gulp.dest(htmlPath))
})

// 清除中间文件
gulp.task('cleanTemp', function() {
    return gulp.src(['./dist', './rev'])
        .pipe($.clean())
});

// dev替换路径
gulp.task('devReplacePath', function() {
        return gulp.src([htmlSrc])
            .pipe(replace(/project/g, 'dist'))
            .pipe(gulp.dest(htmlPath))
    })
    // 清除中间文件
gulp.task('devCleanTemp', function() {
    return gulp.src(['./static/dist', './static/rev'])
        .pipe($.clean())
});
// dev 处理 CSS
gulp.task('devManageCss', function() {
        return gulp.src(sassSrc)
            .pipe($.minifyCss()) // 压缩
            //   .pipe($.rev()) // 版本化
            .pipe(gulp.dest('./static/dist/css'))
            //   .pipe($.rev.manifest()) // 生成映射表
            //    .pipe(gulp.dest('./static/rev/css'))

    })
    // dev 处理 jS
gulp.task('devManageJs', function() {
        return gulp.src(jsSrc)
            .pipe($.babel()) // babel 编译
            .pipe($.uglify()) // 压缩
            //      .pipe($.rev()) // 版本化
            .pipe(gulp.dest('./static/dist/js'))
            //      .pipe($.rev.manifest()) // 生成映射表
            //      .pipe(gulp.dest('./static/rev/js'))
    })
    // dev
gulp.task('watch', function() {
    gulp.watch(jsSrc, ['devManageJs']),
        gulp.watch(cssSrc, ['devManageCss'])
});



// devsass 处理 CSS
gulp.task('devsass', function() {
    return gulp.src(sassSrc)
        .pipe(sass()) // 压缩
        .pipe(gulp.dest('./static/project/css'))
});
gulp.task('sassWatch', function() {
    gulp.watch(sassSrc, ['devsass'])
});

gulp.task('sassdev', function(done) {
    runSequence( // 同步执行
        ['devsass'], ['sassWatch']
    )
});

// build
//['cleanSrc'], ['inputCss'], ['inputJs'], ['replacePath'], ['cleanTemp'],
gulp.task('build', function(done) {
    runSequence( // 同步执行
        ['cleanTemp'], ['manageImg'], ['manageCss'], ['manageJs'],
        done
    )
});
// dev
gulp.task('dev', function(done) {
    runSequence( // 同步执行
        ['devCleanTemp'], ['devManageCss'], ['devManageJs'], ['watch']
    )
});





//['devReplacePath']
//   ['devCleanTemp'], ['devManageCss'], ['devManageJs'],['devReplacePath'],['watch']
// default
// gulp.task('default', ['build'])