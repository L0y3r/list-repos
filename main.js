const Octokit = require('@octokit/rest')
const octokit = new Octokit ()

const getRepos = async (user) => {
    const {data} = await octokit.repos.listForUser({username:user});
    console.log(data);
}
getRepos('L0y3r');