const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    const currentRepo = process.env.GITHUB_REPOSITORY;
    // const githubToken = core.getInput('github-token');
  
    console.log('hello world', currentRepo);
    console.log('context', github.context);
};


run();