const express = require('express');
const repos = require('./getrepos');
const app = express();
const port = 3000;

app.get('/:user', async (req, res) => {
    try {
        const data = await repos.getRepos(req.params.user);
        res.json(data);
    } catch (error) {
        res.send(error);
        return;
    }
});

app.listen(port);