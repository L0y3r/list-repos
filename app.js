const express = require('express');
const repos = require('./getrepos');
const app = express();
const port = 3000;

app.get('/:user', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const data = JSON.stringify(await repos.getRepos(req.params.user));
    res.send(data);
});

app.listen(port);