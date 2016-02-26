var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var browser  = require('browser-sync');
var gulp     = require('gulp');
var panini   = require('panini');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');

// Check for --production flag
var isProduction = !!(argv.production);

// Port to use for the development server.
var PORT = 8000;

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
  assets: [
    'src/assets/**/*',
    '!src/assets/{!img,js,scss}/**/*',
    '!src/assets/scss/'
  ],
  sass: [
    'bower_components/bootstrap-sass/stylesheets',
    'bower_components/font-awesome/scss',
    'bower_components/bootstrap-select/sass'
  ],
  javascript: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-validation/dist/jquery.validate.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    'bower_components/bootstrap-select/dist/js/bootstrap-select.js',
    'bower_components/bootstrap-toggle/js/bootstrap-toggle.js',
    'bower_components/fastclick/lib/fastclick.js',
    'src/assets/js/custom-file-input.js',
    'src/assets/js/replacetext.js',
    'src/assets/js/spin.js',
    'src/assets/js/app-form-validation.js',
    'src/assets/js/app.js',
  ],
  modernizr: [
    'src/assets/js/modernizr-custom.min.js'
  ]
};

// fonts
var fonts = {
    in: ['bower_components/font-awesome/fonts/*', 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*'],
    out:'dist/assets/fonts/'
};

// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
  return gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  rimraf('dist', done);
});

// Copy files out of the assets folder
// This task skips over the "img", "js", "video", "pdf" and "scss" folders, which are parsed separately
gulp.task('copy', function() {
  gulp.src(PATHS.assets)
    .pipe(gulp.dest('dist/assets'));
});

// Copy page templates into finished HTML files
gulp.task('pages', function() {
  gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('pages:reset', function(cb) {
  panini.refresh();
  gulp.run('pages');
  cb();
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function() {

  var cssnano = $.if(isProduction, $.cssnano({discardComments: {removeAll: true}}));

  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(cssnano)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/css'));
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/js'));


});

gulp.task('modernizr', function() {
  return gulp.src(PATHS.modernizr)
    .pipe(gulp.dest('dist/assets/js'));
});

// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
  var imagemin = $.if(isProduction, $.imagemin({
    progressive: true
  }));

  return gulp.src('src/assets/img/**/*')
    .pipe(imagemin)
    .pipe(gulp.dest('dist/assets/img'));
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', function(done) {
  sequence('clean', ['fonts', 'pages', 'sass', 'javascript', 'modernizr', 'images', 'copy'], done);
});

// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
  browser.init({
    server: 'dist', port: PORT
  });
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
  gulp.watch(PATHS.assets, ['copy', browser.reload]);
  gulp.watch(['src/pages/**/*.html'], ['pages', browser.reload]);
  gulp.watch(['src/{layouts,partials}/**/*.html'], ['pages:reset', browser.reload]);
  gulp.watch(['src/assets/scss/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript', browser.reload]);
  gulp.watch(['src/assets/img/**/*'], ['images', browser.reload]);
});
