import loader from "../src";
import cjsMain from "../src/cjs-main";

import webpack from "./helpers/webpack-harness";

const load = async (testId, ignoreParseErrors) =>
  ignoreParseErrors
    ? webpack(testId, { ignoreParseErrors: true })
    : webpack(testId);

const checkFile = async (testId, ignoreParseErrors) => {
  const result = await load(testId, ignoreParseErrors);
  expect(result.module ? result.module.source : "").toMatchSnapshot("content");
  expect(result.warnings).toMatchSnapshot("warnings");
  expect(result.errors).toMatchSnapshot("errors");
};

describe("the jsonlines loader", () => {
  it("exports a function", () => {
    expect(loader).toBeInstanceOf(Function);
  });

  it("exports as Common-JS", () => {
    expect(cjsMain).toEqual(loader);
  });

  it("handles an empty file", async () =>
    checkFile("./jsonl/valid-nolines-noblank.jsonl"));
  it("handles a single newline", async () =>
    checkFile("./jsonl/valid-nolines-blank.jsonl"));
  it("handles a single line of JSON", async () =>
    checkFile("./jsonl/valid-oneline-noblank.jsonl"));
  it("handles a single line of JSON with trailing newline", async () =>
    checkFile("./jsonl/valid-oneline-blank.jsonl"));
  it("handles valid lines of JSON", async () =>
    checkFile("./jsonl/valid-manylines-noblank.jsonl"));
  it("handles valid lines of JSON with trailing newline", async () =>
    checkFile("./jsonl/valid-manylines-blank.jsonl"));

  it("handles an invalid blank file", async () =>
    checkFile("./jsonl/invalid-blank.jsonl"));
  it("handles an invalid blank file ignoring parse errors", async () =>
    checkFile("./jsonl/invalid-blank.jsonl", true));
  it("handles invalid lines of JSON", async () =>
    checkFile("./jsonl/invalid-manylines.jsonl"));
  it("handles invalid lines of JSON ignoring parse errors", async () =>
    checkFile("./jsonl/invalid-manylines.jsonl", true));

  it("handles missing source", async () =>
    checkFile("./jsonl/this-does-not-exist.jsonl"));
});
