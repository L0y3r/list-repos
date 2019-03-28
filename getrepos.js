require('dotenv').config();

const Octokit = require('@octokit/rest');
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});
module.exports = {
    getRepos: (user) => {
        return octokit.repos.listForUser({ username: user }).then(({ data }) => {

            let reposPromises = [];
            const dataLength = data.length;
    
            for (let index = 0; index < dataLength; index++) {
                const repoName = data[index].name;
    
                reposPromises.push(octokit.issues.listForRepo({
                    owner: user,
                    repo: repoName
                }));
            }
    
            return Promise.all(reposPromises).then(responses => {
    
                let reposAndTheirIssues = [];
                const responsesLength = responses.length;
    
                for (let index = 0; index < responsesLength; index++) {
    
                    const repoName = data[index].name,
                        repoIssues = responses[index].data;
    
                    reposAndTheirIssues.push({
                        repo: repoName,
                        issues: repoIssues
                    });
                }
    
                return reposAndTheirIssues;
            }).catch(reason => console.error(reason));
        }).catch(reason => console.error(reason));
    }
}