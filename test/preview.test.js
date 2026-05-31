const { test } = require("node:test");
const assert = require("node:assert");
const { renderMarkdown } = require("../src/server");

// Exercises the marked usage in src/server.js. With marked 0.3.x this passes;
// after a CVE bump to 4.x, marked(src) throws (the export becomes an object), so
// this test fails until src/server.js is migrated to the new marked.parse API.
test("renders a markdown heading to HTML", () => {
  const html = renderMarkdown("# Acme order #1234");
  assert.match(html, /<h1[^>]*>Acme order #1234<\/h1>/);
});

test("renders inline emphasis", () => {
  const html = renderMarkdown("ship it **now**");
  assert.match(html, /<strong>now<\/strong>/);
});
