if (process.env.NODE_ENV === "production") {
  module.exports = {
    plugins: [
      require("autoprefixer"),
      require("cssnano"),
      require("precss"),
      // More postCSS modules here if needed
    ],
  };
}
