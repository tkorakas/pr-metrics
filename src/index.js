const core = require('@actions/core');
const github = require('@actions/github');
const addCommentOnPullRequest = require('./addCommentOnPullRequest');
const fetchPullRequests = require('./fetchPullRequests');
const buildData = require('./buildData');
const buildTable = require('./buildTable');


async function run() {
    const currentRepo = process.env.GITHUB_REPOSITORY;
    const githubToken = core.getInput('github-token');

    const octokit = github.getOctokit(githubToken);

    try {
        const lastDay = new Date();
        lastDay.setDate(0);
        const firstDay = new Date(lastDay);
        firstDay.setDate(1);
        const data = await fetchPullRequests(octokit)({ repo: currentRepo, startDate: firstDay.toISOString().slice(0, 10), endDate: lastDay.toISOString().slice(0, 10)});
        console.log();
        const pullRequests = buildData(data.data.search.nodes);
        if (pullRequests.length === 0) {
            console.log('No pull requests found');
            return;
        }
        const results = buildTable(pullRequests);
        console.log(data);
        await addCommentOnPullRequest(octokit)(`# Pull Request metrics
        ${results}
        `, github.context.payload.pull_request.node_id);
    } catch(e) {
        console.error(e);
    }
};


run();