const Octokit = require('@octokit/rest')
const octokit = new Octokit ()

octokit.repos.listForUser({
    username: 'L0y3r'
}).then(({ data, status, headers }) => {
    console.log(data);
})