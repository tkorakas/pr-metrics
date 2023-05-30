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
        if (data.search.nodes.length === 0) {
            console.log('No pull requests found');
            return;
        }
        const pullRequests = buildData(data.search.nodes);
        pullRequests.sort((a, b) => b.durationRaw - a.durationRaw)
        const results = buildTable(pullRequests);
        console.log('PR Results');
        console.log(results);
        const sum = pullRequests.reduce((acc, pr) => acc + pr.duration, 0);
        console.log(`Average: ${sum/pullRequests.length}`)
//         await addCommentOnPullRequest(octokit)(`# Pull Request metrics

// ${results}

// `, github.context.payload.pull_request.node_id);
    } catch(e) {
        console.error(e);
    }
};


run();