require('dotenv').config();

const Octokit = require('@octokit/rest');
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});
module.exports = {
    getRepos: (user) => {
        return octokit.repos.listForUser({ username: user }).then(({ data }) => {

            const reposPromises = data.map(element => {
                return octokit.issues.listForRepo({
                    owner: user,
                    repo: element.name
                })
            });
    
            return Promise.all(reposPromises).then(responses => {

                const reposAndTheirIssues = responses.map((response, index) => {
                    return {
                        repo: data[index].name,
                        issues: response.data
                    };
                });
    
                return reposAndTheirIssues;
            });
        });
    }
}