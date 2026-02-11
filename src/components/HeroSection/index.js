import React from "react";
import { Link as LinkScroll } from "react-scroll";
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
  Eyebrow,
  Lead,
  Summary,
  ButtonGroup,
  ResumeButton,
  ScrollIndicator,
  ToolStack,
  ToolStackTitle,
  ToolPills,
  ToolPill,
  ToolIcon,
} from "./HeroStyle";
import HeroImg from "../../images/HeroImage.png";
import Typewriter from "typewriter-effect";
import { Bio, skills } from "../../data/constants";
import GitHubActivity from "../GithubActivity";

const allTools = skills.flatMap((category) => category.skills);
const featuredToolNames = [
  "React Js",
  "Next Js",
  "Node Js",
  "Express Js",
  "Postgresql",
  "Docker",
];
const featuredTools = featuredToolNames
  .map((name) => allTools.find((tool) => tool.name === name))
  .filter(Boolean);

const HeroSection = () => {
  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Eyebrow>Software Engineer</Eyebrow>
            <Title>{Bio.name}</Title>
            <Lead>
              I build reliable, scalable web products and platforms for modern teams
              and growing businesses.
            </Lead>
            <TextLoop>
              <span style={{ color: '#888', fontWeight: 500 }}>I work as a</span>
              <Span>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <Summary>
              From UI architecture to APIs and cloud deployment, I focus on performance,
              maintainability, and clean user experiences. I partner with teams to ship
              production-ready software that supports real business outcomes.
            </Summary>
            <ToolStack>
              <ToolStackTitle>Core Tools</ToolStackTitle>
              <ToolPills>
                {featuredTools.map((tool) => (
                  <ToolPill key={tool.name}>
                    <ToolIcon src={tool.image} alt={tool.name} loading="lazy" />
                    {tool.name}
                  </ToolPill>
                ))}
              </ToolPills>
            </ToolStack>
            <ButtonGroup>
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
            </ButtonGroup>
            <GitHubActivity />
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <Img src={HeroImg} alt={`${Bio.name} - Software Engineer`} />
          </HeroRightContainer>
        </HeroInnerContainer>
        <LinkScroll to="skills" smooth offset={-80} duration={600} aria-label="Scroll to skills">
          <ScrollIndicator>
            <span />
          </ScrollIndicator>
        </LinkScroll>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
