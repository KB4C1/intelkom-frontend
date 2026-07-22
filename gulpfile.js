import gulp from "gulp";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import fileInclude from "gulp-file-include";
import plumber from "gulp-plumber";
import concat from "gulp-concat";
import { deleteAsync } from "del";
import browserSyncLib from "browser-sync";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import esbuild from "esbuild";

const browserSync = browserSyncLib.create();

const paths = {
  html: {
    src: "src/html/**/*.html",
    watch: ["src/html/**/*.html", "src/partials/**/*.html"],
    dest: "dist",
  },
  css: {
    src: "src/styles/main.css",
    watch: "src/styles/**/*.css",
    dest: "dist/css",
  },
  js: {
    src: "src/js/*.js",
    watch: "src/js/**/*.js",
    dest: "dist/js",
  },
  vendor: {
    src: [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/jquery-migrate/dist/jquery-migrate.min.js",
      "node_modules/slick-carousel/slick/slick.min.js",
    ],
    dest: "dist/js",
  },
  slickAssets: {
    src: [
      "node_modules/slick-carousel/slick/fonts/**/*",
      "node_modules/slick-carousel/slick/ajax-loader.gif",
    ],
    base: "node_modules/slick-carousel/slick",
    dest: "dist/css",
  },
  assets: {
    src: "src/assets/**/*",
    dest: "dist/assets",
  },
};

export function clean() {
  return deleteAsync(["dist"]);
}

export function html() {
  return gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
        context: {
          webRoot: "/intelkom-frontend",
        },
      }),
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

export function styles() {
  const plugins = [tailwindcss(), autoprefixer()];

  return gulp
    .src(paths.css.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(rename("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream());
}

export function vendorScripts() {
  return gulp
    .src(paths.vendor.src)
    .pipe(plumber())
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest(paths.vendor.dest))
    .pipe(browserSync.stream());
}

export function slickAssets() {
  return gulp
    .src(paths.slickAssets.src, {
      encoding: false,
      base: paths.slickAssets.base,
    })
    .pipe(gulp.dest(paths.slickAssets.dest));
}

export function scripts() {
  return esbuild.build({
    entryPoints: ["src/js/main.js"],
    bundle: true,
    outfile: "dist/js/main.js",
    format: "esm",
    sourcemap: true,
  });
  browserSync.reload();
}

export function assets() {
  return gulp
    .src(paths.assets.src, { encoding: false })
    .pipe(gulp.dest(paths.assets.dest));
}

export function serve(done) {
  browserSync.init({
    server: {
      baseDir: "./",
      routes: {
        "/intelkom-frontend": "dist",
      },
    },
    port: 3000,
    notify: false,
    open: false,
  });
  done();
}

export function watchFiles() {
  gulp.watch(paths.html.watch, html);
  gulp.watch(paths.css.watch, styles);
  gulp.watch(paths.js.watch, scripts);
  gulp.watch(paths.assets.src, assets);
  gulp.watch("dist/**/*.html").on("change", browserSync.reload);
}

export const build = gulp.series(
  clean,
  gulp.parallel(html, styles, vendorScripts, scripts, assets, slickAssets),
);

export default gulp.series(build, serve, watchFiles);
export { clean as cleanDist };
