require('dotenv').config();

const Octokit = require('@octokit/rest');
const octokit = new Octokit ({
    auth: process.env.GITHUB_TOKEN
});

const getRepos = async (user) => {
    let reposAndTheirIssues = [];
    const {data} = await octokit.repos.listForUser({username:user});
    let dataLength = data.length;
    while (dataLength) {
        dataLength--;
        let repoName = data[dataLength].name;
        const issues = await octokit.issues.listForRepo({
            owner:user,
            repo:repoName
        });
        reposAndTheirIssues.push({repo: repoName, issues: issues.data});
    }
    console.log(reposAndTheirIssues);
}
getRepos('IntersysConsulting');