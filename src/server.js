// Acme checkout API. Imports SOME dependencies (reachable) and deliberately
// leaves others declared-but-unused (so reachability triage de-prioritizes them).
const express = require("express");
const _ = require("lodash");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const handlebars = require("handlebars");
const validator = require("validator");

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

module.exports = app;
