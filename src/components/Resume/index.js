import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0 40px 0;
  width: 100%;
  background: ${({ theme }) => theme.card};
`;

const Title = styled.h2`
  font-size: 38px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 18px;
  text-align: center;
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
  background: linear-gradient(90deg, #00C9A7 0%, #845EC2 100%);
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  margin-bottom: 32px;
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  background: #fff;
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
    <Title>My Resume</Title>
    <DownloadButton href={Bio.resume} target="_blank" rel="noopener noreferrer">
      Download My Resume
    </DownloadButton>
    <IframeWrapper>
      <iframe
        src={Bio.resume.replace("/edit", "/preview")}
        title="Ibrahim Bello Resume"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 400 }}
        allowFullScreen
      ></iframe>
    </IframeWrapper>
  </Container>
);

export default Resume; 