"use strict";

const express = require("express");
const Prometheus = require("prom-client");

const port = process.env.PORT || 3030;
const app = express();

const hostLiveStatus = new Prometheus.Gauge({
  name: "xpub_epmc_host_live_status",
  help: "Situation where xpub-epmc host is running: 1 means OK, 0 means Error",
  labelNames: ["status"]
});

app.get("/metrics", (req, res) => {
  hostLiveStatus.set(1);
  res.set("Content-Type", Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

app.listen(port, function() {
  console.log(`App listening on port ${port}`);
});
