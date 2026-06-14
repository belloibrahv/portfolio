import React from "react";
import styled from "styled-components";
import { Bio, resumeHighlights } from "../../data/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0 48px 0;
  width: 100%;
  background:
    radial-gradient(circle at 10% 12%, rgba(45, 212, 191, 0.07), transparent 30%),
    radial-gradient(circle at 88% 12%, rgba(56, 189, 248, 0.07), transparent 30%);
`;

const Title = styled.h2`
  font-size: 38px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 18px;
  text-align: center;
`;

const Desc = styled.p`
  max-width: 760px;
  margin-bottom: 18px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.75;
  font-size: 16px;
`;

const HighlightRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 24px;
  max-width: 940px;
`;

const Highlight = styled.div`
  padding: 10px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + "1f"};
  color: ${({ theme }) => theme.text_primary};
  font-size: 13px;
  font-weight: 600;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  min-height: 48px;
  padding: 14px 32px;
  color: ${({ theme }) => theme.white};
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%);
  box-shadow: 0 10px 28px rgba(2, 8, 23, 0.18);
  margin-bottom: 18px;
  transition: all 0.3s;
  &:hover {
    filter: brightness(1.08);
    transform: translateY(-2px) scale(1.03);
  }
  @media (max-width: 480px) {
    min-height: 44px;
    padding: 12px 24px;
    font-size: 16px;
    width: 100%;
    max-width: 320px;
  }
`;

const IframeWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  min-height: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 44px rgba(2, 8, 23, 0.16);
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + "1f"};
  @media (max-width: 960px) {
    min-height: 400px;
    max-width: 100%;
  }
  @media (max-width: 600px) {
    min-height: 300px;
  }
`;

const Resume = () => (
  <Container id="resume">
    <Title>Resume Preview</Title>
    <Desc>
      This portfolio is synced to the latest Google Docs version of my resume, so the story
      stays aligned across both places. Open it directly if you want the plain document view.
    </Desc>
    <HighlightRow>
      {resumeHighlights.slice(0, 3).map((item) => (
        <Highlight key={item}>{item}</Highlight>
      ))}
    </HighlightRow>
    <DownloadButton href={Bio.resume} target="_blank" rel="noopener noreferrer">
      Open Full Resume
    </DownloadButton>
    <IframeWrapper>
      <iframe
        src={Bio.resume.replace("/edit", "/preview")}
        title={`${Bio.name} Resume`}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 400 }}
        allowFullScreen
      ></iframe>
    </IframeWrapper>
  </Container>
);

export default Resume; 
