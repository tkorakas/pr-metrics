const core = require('@actions/core');
const github = require('@actions/github');
const fetchPullRequestById = require('./repositories/fetchPullRequestById');


async function run() {
    const currentRepo = process.env.GITHUB_REPOSITORY;
    const githubToken = core.getInput('github-token');

    const octokit = github.getOctokit(githubToken);

    // const container = new Map();
    // container.set('fetchPullRequestById', fetchPullRequestById(octokit));
    console.log(github.context.payload.pull_request.node_id, 'PR ID');
    fetchPullRequestById(octokit)(github.context.payload.pull_request.node_id);
  
    console.log('hello world', currentRepo);
    console.log('context', github.context);
};


run();