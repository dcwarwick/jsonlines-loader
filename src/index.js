/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Dave Clark @dcwarwick
*/

import { getOptions } from "loader-utils";
import validateOptions from "schema-utils";

const schema = {
  type: "object",
  properties: {
    ignoreParseErrors: {
      type: "boolean"
    }
  },
  additionalProperties: false
};

export default function loader(source) {
  const options = getOptions(this) || {};
  validateOptions(schema, options, "JSON Lines loader");

  const processLine = line => {
    try {
      // parse each line and stringify it, to ensure valid JSON
      const parsed = JSON.parse(line);
      return JSON.stringify(parsed);
    } catch (err) {
      if (options && options.ignoreParseErrors) {
        // if there was a parse error and we're ignoring them
        // just copy the source line in as a string
        return `"${line.replace(/"/g, '\\"')}"`;
      }
      // otherwise report parse errors to WebPack
      this.emitError(err);
      return "";
    }
  };

  const result = `module.exports = [${source
    // split the source into 'lines' delimited by newline
    .split("\n")
    // if the last line is empty we discard it
    .filter((line, index, lines) => index < lines.length - 1 || /\S/.test(line))
    // convert each line into a javascript literal
    .map(line => processLine(line))
    // concatenate the literals into an array literal (with empty zeroth element)
    .join(",")}]`;

  return result;
}
