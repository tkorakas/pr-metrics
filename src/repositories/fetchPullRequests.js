const PRS_QUERY = `
  query ($query: String!) {
    search(
        first: 100
        query: $query
        type: ISSUE
    ) {
        nodes {
        ... on PullRequest {
            title
            url
            id
            publishedAt
            closedAt
            reviews(first: 1) {
            nodes {
                id
                submittedAt
            }
            }
        }
        }
    }
  }
`;

module.exports = (octokit) => ({
    owner,
    repo
  }) => {
    const query = `repo:${owner}/${repo} is:pr is:open is:closed created:2023-04-01..2023-04-30`;
    const variables = { query, after, owner, repo };

    return octokit
      .graphql(PRS_QUERY, variables)
      .catch((error) => {
        const msg = `Error fetching pull requests with variables "${JSON.stringify(variables)}"`;
        throw new Error(`${msg}. Error: ${error}`);
      });
  };
