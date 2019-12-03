module.exports = api => {
  api.assertVersion(7);
  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "10.6.0"
          }
        }
      ]
    ]
  };
};
