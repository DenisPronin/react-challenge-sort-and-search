module.exports = {
  paths: {
    sass: './sass/main.scss',
    entry: './js/index.js',
    js: './js/**/*.js',
    html: './*.html',
    dist: './public',
    images: './images/**/*'
  },
  output: {
    js: 'js',
    css: 'css',
    images: 'images'
  },
  env: process.env.NODE_ENV
};
