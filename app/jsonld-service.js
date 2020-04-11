const jsonld = require("jsonld");
const contexts = require("./contexts");

const { obi: OBI_CONTEXT, blockcertsv2: BLOCKCERTSV2_CONTEXT } = contexts;
const CONTEXTS = {};
// Preload contexts
CONTEXTS["https://w3id.org/openbadges/v2"] = OBI_CONTEXT;
CONTEXTS["https://openbadgespec.org/v2/context.json"] = OBI_CONTEXT;
CONTEXTS["https://w3id.org/blockcerts/v2"] = BLOCKCERTSV2_CONTEXT;
CONTEXTS[
  "https://www.w3id.org/blockcerts/schema/2.0/context.json"
] = BLOCKCERTSV2_CONTEXT;

normalize = async document => {
  const normalizeArgs = {
    algorithm: "URDNA2015",
    format: "application/nquads",
    expandContext: document["@context"]
  };

  jsonld.documentLoader = customLoader;

  const normalized = await jsonld.canonize(document, normalizeArgs);

  return normalized;
};

customLoader = url => ({
  contextUrl: null,
  document: CONTEXTS[url],
  documentUrl: url
});

module.exports = {
  normalize
};
