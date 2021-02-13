const bcrypt = require("bcrypt");

async function hash(query) {
  const salt = await bcrypt.genSalt(10);
  const hashedQuery = await bcrypt.hash(query, salt);

  return hashedQuery;
}

exports.hash = hash;
