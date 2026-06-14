import React from "react";
import { motion } from "framer-motion";
import { Link as LinkScroll } from "react-scroll";
import HeroBgAnimation from "../HeroBgAnimation";
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  HeroStatsGrid,
  StatCard,
  StatLabel,
  StatValue,
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
  TrustRow,
  TrustChip,
  ImageFrame,
  FloatingCard,
  FloatingCardLabel,
  FloatingCardValue,
  SoftButton,
} from "./HeroStyle";
import HeroImg from "../../images/HeroImage.png";
import Typewriter from "typewriter-effect";
import { Bio, heroStats, resumeHighlights, skills } from "../../data/constants";
import GitHubActivity from "../GithubActivity";

const allTools = skills.flatMap((category) => category.skills);
const featuredToolNames = [
  "React Js",
  "Next Js",
  "TypeScript",
  "Node Js",
  "Postgresql",
  "Vercel",
];
const featuredTools = featuredToolNames
  .map((name) => allTools.find((tool) => tool.name === name))
  .filter(Boolean);

const HeroSection = () => {
  return (
    <div id="home">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer
            as={motion.div}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <Eyebrow>Technical Lead · Full-Stack & Senior Frontend Engineer</Eyebrow>
            <Title>{Bio.name}</Title>
            <Lead>
              I build reliable, scalable web products for enterprise teams, public-sector
              platforms, and growing businesses that need clean delivery and calm execution.
            </Lead>
            <TextLoop>
              <span style={{ color: "rgba(168,179,195,0.95)", fontWeight: 600 }}>I work as a</span>
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
              From UI architecture to APIs, cloud deployment, and team process, I focus on
              performance, maintainability, and clean experiences that are easy to trust.
            </Summary>
            <HeroStatsGrid>
              {heroStats.map((stat) => (
                <StatCard
                  as={motion.div}
                  key={stat.label}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <StatLabel>{stat.label}</StatLabel>
                  <StatValue>{stat.value}</StatValue>
                </StatCard>
              ))}
            </HeroStatsGrid>
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
              <SoftButton
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Projects
              </SoftButton>
            </ButtonGroup>
            <TrustRow>
              <TrustChip>Enterprise delivery</TrustChip>
              <TrustChip>Open source</TrustChip>
              <TrustChip>AI-enabled products</TrustChip>
            </TrustRow>
            <Summary style={{ marginTop: "18px" }}>
              {resumeHighlights[0]}
            </Summary>
            <GitHubActivity />
          </HeroLeftContainer>

          <HeroRightContainer
            as={motion.div}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.05 }}
          >
            <ImageFrame>
              <Img src={HeroImg} alt={`${Bio.name} - Technical Lead`} />
              <FloatingCard
                as={motion.div}
                left="18px"
                top="18px"
                initial={{ opacity: 0, x: -12, y: -8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <FloatingCardLabel>Current focus</FloatingCardLabel>
                <FloatingCardValue>Enterprise dashboards, AI workflows, and product systems.</FloatingCardValue>
              </FloatingCard>
              <FloatingCard
                as={motion.div}
                right="18px"
                bottom="18px"
                initial={{ opacity: 0, x: 12, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <FloatingCardLabel>Working style</FloatingCardLabel>
                <FloatingCardValue>Clear communication, fast iteration, and reliable handoff.</FloatingCardValue>
              </FloatingCard>
            </ImageFrame>
          </HeroRightContainer>
        </HeroInnerContainer>
        <LinkScroll to="about" smooth offset={-80} duration={600} aria-label="Scroll to about">
          <ScrollIndicator>
            <span />
          </ScrollIndicator>
        </LinkScroll>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
