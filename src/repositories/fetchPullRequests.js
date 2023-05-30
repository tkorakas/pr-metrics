const PRS_QUERY = `
  query ($searchQuery: String!) {
    search(
        first: 100
        query: $searchQuery
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
    repo,
    startDate,
    endDate
  }) => {
    const searchQuery = `repo:${owner}/${repo} is:pr is:closed closed:${startDate}..${endDate}`;
    const variables = { searchQuery };

    return octokit
      .graphql(PRS_QUERY, variables)
      .catch((error) => {
        const msg = `Error fetching pull requests with variables "${JSON.stringify(variables)}"`;
        throw new Error(`${msg}. Error: ${error}`);
      });
  };
