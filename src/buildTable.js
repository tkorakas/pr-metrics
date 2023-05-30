const table = require('markdown-table');

module.exports = (pullRequests) => {
    const buildGithubLink = (description, url) => `[${description}](${url})`;

    // const toTable = (prs) => prs.map(pr => [buildGithubLink(pr.title, pr.url), pr.duration]);
    const toTable = (prs) => prs.map(pr => [pr.url, pr.duration]);

    return table([
        ['PR', 'Duration'],
        ...toTable(pullRequests)
    ]);
}
  