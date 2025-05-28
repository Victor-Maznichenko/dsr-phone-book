const pool = require('../config/db');

exports.registration = async (req, res) => {
  try {
    res.json("Server is work!")
  } catch (err) {
  }
};

exports.login = async (req, res) => {
  const { name, email } = req.body;
  try {
    res.json("Server is work!")
  } catch (err) {
  }
};
