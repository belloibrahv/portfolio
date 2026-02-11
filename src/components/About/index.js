import React from 'react';
import styled from 'styled-components';
import { Bio } from '../../data/constants';
import HeroImg from '../../images/HeroImage.png';

const Container = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 60px 0 40px 0;
  width: 100%;
  background: ${({ theme }) => theme.card};
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 40px 0 20px 0;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 32px;
  @media (max-width: 900px) {
    align-items: center;
    padding: 0 0 24px 0;
  }
`;

const Right = styled.div`
  flex: 0 0 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    margin-bottom: 24px;
  }
`;

const Photo = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  border: 4px solid ${({ theme }) => theme.primary};
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;
`;

const Story = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 18px;
  line-height: 1.6;
`;

const Highlights = styled.ul`
  margin: 0 0 18px 0;
  padding: 0 0 0 18px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
`;

const ValueSection = styled.div`
  margin-top: 18px;
  font-size: 17px;
  color: ${({ theme }) => theme.text_secondary};
`;

const About = () => (
  <Container id="about">
    <Right>
      <Photo src={HeroImg} alt="Ibrahim Bello" />
    </Right>
    <Left>
      <Title>About Me</Title>
      <Story>
        Hi, I'm <b>{Bio.name}</b> — a passionate full-stack developer from Nigeria. My journey began with curiosity and a drive to solve real-world problems with code. Over the years, I've helped global startups build fast, scalable web apps, AI tools, and robust backends.<br /><br />
        I thrive in remote, multicultural teams and love turning ideas into reality. My mission is to empower founders and teams to launch, iterate, and scale products that matter.
      </Story>
      <Highlights>
        <li>🌍 Remote-first, startup-friendly mindset</li>
        <li>🛠️ Deep expertise: React, TypeScript, Python, Docker, PostgreSQL</li>
        <li>🚀 Fast prototyping & delivery for MVPs and scale-ups</li>
        <li>🤝 Collaborative, transparent, and always learning</li>
      </Highlights>
      <ValueSection>
        <b>Values:</b> Empathy, curiosity, and a relentless focus on user value. I believe in building with purpose, learning from every challenge, and making tech accessible to all.
      </ValueSection>
    </Left>
  </Container>
);

export default About;