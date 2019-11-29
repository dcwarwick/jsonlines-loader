/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Dave Clark @dcwarwick
*/

export default function loader(source) {
  const entry = (line, number) => {
    let parsed;
    // parse each line to ensure it contains valid JSON
    try {
      parsed = JSON.parse(line);
    } catch (err) {
      this.emitError(err);
    }
    // create an object field entry keyed by the line number
    return `${number}:${JSON.stringify(parsed)}`;
  };

  return `module.exports = {${source
    // split the source into 'lines' delimited by newline
    .split("\n")
    // if the last line is empty we discard it
    .filter((line, index, array) => index < array.length - 1 || /\S/.test(line))
    // convert each line into an object field entry, indexing from 1
    .map((line, index) => entry(line, index + 1))
    // combine the output into an object literal that we export
    .join(",")}}`;
}
