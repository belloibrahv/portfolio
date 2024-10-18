import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, CircularProgress } from "@mui/material";

const GitHubActivity = () => {
  const [latestCommit, setLatestCommit] = useState(null);
  const [latestPR, setLatestPR] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the repo details (you'll need to replace 'belloibrahv' and 'repo-name' with actual values)
    const username = "belloibrahv";
    const repoName = "Eonix";

    // Function to fetch the latest commit
    const fetchLatestCommit = async () => {
      try {
        const commitResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}/commits`
        );
        const latestCommitData = commitResponse.data[0]; // Get the latest commit
        setLatestCommit(latestCommitData);
      } catch (error) {
        console.error("Error fetching commit:", error);
      }
    };

    // Function to fetch the latest pull request
    const fetchLatestPR = async () => {
      try {
        const prResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}/pulls?state=all`
        );
        const latestPRData = prResponse.data[0]; // Get the latest pull request
        setLatestPR(latestPRData);
      } catch (error) {
        console.error("Error fetching pull request:", error);
      }
    };

    // Fetch both commit and PR
    const fetchGitHubData = async () => {
      await Promise.all([fetchLatestCommit(), fetchLatestPR()]);
      setLoading(false);
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box my={2}>
      <Typography variant="h6" component="div" color='rgba(153, 0, 255, 1)'>
        Latest GitHub Contributions
      </Typography>

      {latestCommit && (
        <Box mt={2}>
          <Typography variant="body1">
            <span color="rgba(153, 0, 255, 1)">Last Commit:</span>{" "}
            <a href={latestCommit.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color:'rgba(153, 0, 255, 1)' }}>
              {latestCommit.commit.message}
            </a>
          </Typography>
          <Typography variant="body2" color="rgb(242, 243, 244)">
            Committed on {new Date(latestCommit.commit.committer.date).toLocaleString()}
          </Typography>
        </Box>
      )}

      {latestPR && (
        <Box mt={2}>
          <Typography variant="body1">
            <span color="rgba(153, 0, 255, 1)">Last Pull Request:</span>{" "}
            <a href={latestPR.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color:'rgba(153, 0, 255, 1)' }}>
              {latestPR.title}
            </a>
          </Typography>
          <Typography variant="body2" color="rgb(242, 243, 244)">
            Opened on {new Date(latestPR.created_at).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default GitHubActivity;
