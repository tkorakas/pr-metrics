const PR_BY_ID_QUERY = `
  query($id: ID!) {
    node(id: $id) {
      ... on PullRequest {
        id
        url
        body
        number
        createdAt
        closedAt
        reviewThreads(last: 50) {
        nodes {
            id
            isResolved
        }
        }
        comments(last: 100) {
          nodes {
            author {
              login
            }
            body
          }
        }
      }
    }
  }
`;

module.exports = (octokit) => (id) => {
    const variables = { id };
    return octokit
      .graphql(PR_BY_ID_QUERY, variables)
      .then(data => data)
      .catch((error) => {
        const msg = `Error fetching pull requests with id "${id}"`;
        throw new Error(`${msg}. Error: ${error}`);
      });
  
}