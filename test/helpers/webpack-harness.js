import path from "path";

import Memory from "memory-fs";
import webpack from "webpack";

export default function(fileId, options) {
  const configrule = {
    test: /\.jsonl$/i,
    use: [{ loader: path.resolve(__dirname, "../../src/index.js") }]
  };

  if (options) {
    configrule.use[0].options = options;
  }

  const compiler = webpack({
    mode: "development",
    devtool: "sourcemap",
    context: path.resolve(__dirname, ".."),
    entry: path.resolve(__dirname, "..", fileId),
    module: {
      rules: [configrule]
    },
    optimization: {
      runtimeChunk: true
    }
  });

  compiler.outputFileSystem = new Memory();

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) =>
      err
        ? reject(err)
        : resolve({
            module: stats.toJson().modules.find(m => m.id === fileId),
            warnings: stats.compilation.warnings,
            errors: stats.compilation.errors.map(error => {
              // eslint-disable-next-line no-param-reassign
              error.message = error.message
                .replace(/\(from .*?\)/i, "(replaced/path)")
                .replace(/resolve '.*?' in '.*?'/i, "resolve replaced/paths");
              return error;
            })
          })
    )
  );
}
