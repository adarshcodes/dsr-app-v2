const express = require("express");
const {ProjectUpdate, ProjectCreate} = require ("../helpers/project");
const app = express();

app.post("/addproject",ProjectCreate);

module.exports = app;