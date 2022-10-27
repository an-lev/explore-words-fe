module.exports = {
  devServer: {
    host: "localhost",
    https: {
      key: "./certs/localhost-key.pem",
      cert: "./certs/localhost.pem",
    },
    port: "3000",
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  }
};
