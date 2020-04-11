const express = require("express");
const JsonldService = require("./app/jsonld-service");

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/", (_, res) => {
  res.send("JsonLd Service");
});

app.post("/api/jsonld-service/normalize", (req, res, next) => {
  return JsonldService.normalize(req.body)
    .then(normalized => res.send(normalized))
    .catch(err => {
      console.log(err);
      res.status(500).send("failedJsonLdNormalization");
    });
});

// PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening on port ${port}..`));
