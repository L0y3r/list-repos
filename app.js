const express = require('express');
const repos = require('./getrepos');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const data = JSON.stringify(await repos.getRepos('IntersysConsulting'));
    res.send(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));