module.exports = (pullRequests) => {
    return pullRequests.map((pr) => {
        const publishedAt = new Date(pr.publishedAt);
        const closedAt = new Date(pr.closedAt);
        const diffTime = Math.abs(closedAt - publishedAt);
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
        return {
            ...pr,
            durationRaw: diffHours,
            duration: diffDays > 0 ? `${diffDays} days` : `${diffHours} hours`
        }
    });
}

