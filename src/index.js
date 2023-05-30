const core = require('@actions/core');
const github = require('@actions/github');
const fetchPullRequestById = require('./repositories/fetchPullRequestById');
const addCommentOnPullRequest = require('./repositories/addCommentOnPullRequest');
const fetchPullRequests = require('./repositories/fetchPullRequests');


async function run() {
    const currentRepo = process.env.GITHUB_REPOSITORY;
    const githubToken = core.getInput('github-token');

    const octokit = github.getOctokit(githubToken);

    // const container = new Map();
    // container.set('fetchPullRequestById', fetchPullRequestById(octokit));
    console.log(github.context.payload.pull_request.node_id, 'PR ID');

    try {
        const data = await fetchPullRequests(octokit)('tkorakas', currentRepo);
        console.log(data);
        await addCommentOnPullRequest(octokit)(`# Hello

        this is a test comment
        `, github.context.payload.pull_request.node_id);
    } catch(e) {
        console.error(e);
    }
    
    // console.log('hello world', currentRepo);
    // console.log('context', github.context);
};


run();