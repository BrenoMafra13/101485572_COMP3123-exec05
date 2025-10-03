const express = require('express');
const fs = require('fs');
const path = require('path');

const routerUser = express.Router();
const userPath = path.join(__dirname, '../user.json');

routerUser.get('/profile', (req, res) => {
  fs.readFile(userPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send({ error: 'Error reading user file' });
    const user = JSON.parse(data);
    res.json(user);
  });
});

routerUser.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(userPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send({ error: 'Error reading user file' });

    const user = JSON.parse(data);

    if (user.username !== username) {
      return res.json({ status: false, message: "User Name is invalid" });
    }

    if (user.password !== password) {
      return res.json({ status: false, message: "Password is invalid" });
    }

    res.json({ status: true, message: "User Is valid" });
  });
});

routerUser.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logout.<b>`);
});

module.exports = routerUser;
