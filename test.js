const lodash = require("lodash");

if (!lodash.VERSION) {
  throw new Error("lodash did not load");
}

console.log("PatchPilot test fixture OK:", lodash.VERSION);
