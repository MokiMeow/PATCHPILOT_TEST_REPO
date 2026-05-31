// Acme checkout API. Imports SOME dependencies (reachable) and deliberately
// leaves others declared-but-unused (so reachability triage de-prioritizes them).
const express = require("express");
const _ = require("lodash");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const handlebars = require("handlebars");
const validator = require("validator");
// marked 0.3.x: the legacy top-level call API. Upgrading to a patched 4.x is a
// BREAKING change (named import + marked.parse), so a real fix must edit this
// source file, not just bump the version — the agentic-remediation showcase.
const marked = require("marked");

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "dev-secret";

app.post("/login", (req, res) => {
  const { email } = req.body || {};
  if (!validator.isEmail(String(email || ""))) return res.status(400).json({ error: "bad email" });
  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

app.get("/order/:id", async (req, res) => {
  const upstream = await axios.get(`https://api.acme.internal/orders/${req.params.id}`);
  const view = ejs.render("<h1><%= name %></h1>", { name: _.get(upstream.data, "customer.name", "guest") });
  res.send(handlebars.compile(view)({}));
});

// Renders a product note written in Markdown. Uses marked's legacy top-level
// call signature marked(src) — exactly what breaks when the CVE fix bumps to 4.x.
app.post("/notes/preview", (req, res) => {
  const source = String((req.body && req.body.markdown) || "");
  const html = marked(source);
  res.type("html").send(html);
});

module.exports = app;
