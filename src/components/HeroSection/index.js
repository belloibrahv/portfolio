import React from "react";
import HeroBgAnimation from "../HeroBgAnimation";
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton,
} from "./HeroStyle";
import HeroImg from "../../images/HeroImage.jpg";
import Typewriter from "typewriter-effect";
import { Bio } from "../../data/constants";
import GitHubActivity from "../GithubActivity";

const HeroSection = () => {
  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Title>
              👋🏽 Hi, I'm {Bio.name}
              <br />
              <span style={{ fontWeight: 400, fontSize: '20px', color: '#888' }}>
                Building fast, scalable web apps for both local and global businesses.
              </span>
            </Title>
            <SubTitle style={{ marginTop: 12, marginBottom: 18, fontSize: 13, fontStyle: 'italic', color: '#666' }}>
              My passion is bringing order to the digital world. I craft software that grows with its users, handling both what you see and what powers it from behind. I'm all about making complex things simple and beautiful through smart design and clever automation.
            </SubTitle>
            <TextLoop>
              <span style={{ color: '#888', fontWeight: 400 }}>I am a</span>
              <Span>
                <Typewriter
                  options={{
                    strings: [
                      "Frontend Engineer",
                      "React Specialist",
                      "Django Specialist",
                      "Software Engineer",
                      "Open Source Advocate"
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle style={{ marginTop: 18, marginBottom: 32, fontSize: 18, color: '#444' }}>
              I help founders and teams launch products quickly, with clean code and a focus on real business results. Let's build something impactful together.
            </SubTitle>
            <div style={{ display: 'flex', gap: '16px', marginBottom: 32 }}>
              <ResumeButton href={Bio.resume} target="_blank" rel="noopener noreferrer">
                View Resume
              </ResumeButton>
              <ResumeButton
                as="button"
                style={{ background: 'linear-gradient(90deg, #00C9A7 0%, #845EC2 100%)' }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let's Work Together
              </ResumeButton>
            </div>
            <GitHubActivity />
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <Img src={HeroImg} alt="hero-image" />
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
