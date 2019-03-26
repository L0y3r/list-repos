const Octokit = require('@octokit/rest')
const octokit = new Octokit ()

const getRepos = async (user) => {
    let reposAndTheirIssues = [];
    const {data} = await octokit.repos.listForUser({username:user});
    dataLength = data.length;
    while (dataLength) {
        dataLength--;
        repoName = data[dataLength].name;
        const issues = await octokit.issues.listForRepo({
            owner:user,
            repo:repoName
        });
        reposAndTheirIssues.push({repoName: issues.data});
    }
    console.log(reposAndTheirIssues);
}
getRepos('IntersysConsulting');