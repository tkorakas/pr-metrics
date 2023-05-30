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
    repo,
    startDate,
    endDate
  }) => {
    const searchQuery = `repo:${repo} is:pr is:open is:closed closed:${startDate}..${endDate}`;
    const variables = { searchQuery };

    console.log(`Searching for: ${searchQuery}`);
    return octokit
      .graphql(PRS_QUERY, variables)
      .catch((error) => {
        const msg = `Error fetching pull requests with variables "${JSON.stringify(variables)}"`;
        throw new Error(`${msg}. Error: ${error}`);
      });
  };
