import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, CircularProgress } from "@mui/material";

const GitHubActivity = React.memo(() => {
  const [mergedPRs, setMergedPRs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = "belloibrahv";
  const cacheKey = `github_prs_${username}`;
  const cacheExpiry = 5 * 60 * 1000; // 5 minutes

  // Fetch merged pull requests with caching
  useEffect(() => {
    const fetchMergedPRs = async () => {
      // Check cache first
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheExpiry) {
          setMergedPRs(data);
          setLoading(false);
          return;
        }
      }

      try {
        const prResponse = await axios.get(
          `https://api.github.com/search/issues?q=author:${username}+is:pr+is:merged&per_page=3`,
          { timeout: 10000 } // 10 second timeout
        );
        const prs = prResponse.data.items.slice(0, 3);
        setMergedPRs(prs);
        
        // Cache the result
        localStorage.setItem(cacheKey, JSON.stringify({
          data: prs,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.error("Error fetching merged PRs:", error);
        setError("Failed to load GitHub activity");
      } finally {
        setLoading(false);
      }
    };

    fetchMergedPRs();
  }, [username, cacheKey, cacheExpiry]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box my={4}>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box my={4}>
      <Typography variant="h6" component="div" color="rgba(153, 0, 255, 1)">
        Latest Merged Pull Requests
      </Typography>
      {mergedPRs.length > 0 ? (
        mergedPRs.map((pr) => (
          <Box key={pr.id} mt={3}>
            <Typography variant="body1">
              <a
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "rgba(153, 0, 255, 1)" }}
              >
                {pr.title}
              </a>
            </Typography>
            <Typography variant="body2" color="rgb(242, 243, 244)">
              Merged on {new Date(pr.closed_at).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="rgb(242, 243, 244)">
              Repository: {pr.repository_url.split("/").slice(-1)}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="rgb(242, 243, 244)" mt={2}>
          No merged PRs found.
        </Typography>
      )}
    </Box>
  );
});

export default GitHubActivity;
