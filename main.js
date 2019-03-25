const Octokit = require('@octokit/rest')
const octokit = new Octokit ()

const getRepos = async (user) => {
    const {data} = await octokit.repos.listForUser({username:user});
    dataLength = data.length;
    while (dataLength) {
        dataLength--;
        repoName = data[dataLength].name;
        const result = await octokit.issues.listForRepo({
            owner:user,
            repo:repoName
        });
        console.log(repoName, result.data);
    }
}
getRepos('IntersysConsulting');