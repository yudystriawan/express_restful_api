const bcrypt = require("bcrypt");

async function hash(query) {
  const salt = await bcrypt.genSalt(10);
  const hashedQuery = await bcrypt.hash(query, salt);

  return hashedQuery;
}

async function compare(providedPassword, storedPassword) {
  const passwordIsMatched = await bcrypt.compare(
    providedPassword,
    storedPassword
  );
  return passwordIsMatched;
}

exports.hash = hash;
exports.compare = compare;
