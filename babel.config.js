module.exports = api => {
  api.assertVersion(7);
  api.cache(true);

  return {
    presets: [["@babel/preset-env"]]
  };
};
