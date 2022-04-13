const withTM = require("next-transpile-modules")(["next-router-event"]);

module.exports = withTM({
  reactStrictMode: true,
});
