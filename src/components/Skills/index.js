import React from "react";
import styled from "styled-components";
import { skills } from "../../data/constants";

const categoryOrder = ["Frontend", "Backend", "AI", "Cloud", "Others"];
const orderedSkills = categoryOrder
  .map((title) => skills.find((cat) => cat.title === title))
  .filter(Boolean)
  .flatMap((cat) => cat.skills.map((s) => ({ ...s, category: cat.title })));
const allSkills =
  orderedSkills.length > 0
    ? orderedSkills
    : skills.flatMap((cat) =>
        cat.skills.map((s) => ({ ...s, category: cat.title }))
      );

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 0 80px;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 40px 0 60px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
`;

const SliderRow = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SliderTrack = styled.div`
  display: flex;
  width: max-content;
  animation: scroll 36s linear infinite;
  animation-direction: ${({ reverse }) => (reverse ? "reverse" : "normal")};
  gap: 20px;
  padding: 18px 0;
  will-change: transform;

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translateX(0);
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const SkillItem = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.card};
  border: 1px solid rgba(132, 94, 194, 0.14);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
  }
`;

const SkillImage = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

const SkillName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Skills = () => {
  const topRow = allSkills.filter((_, index) => index % 2 === 0);
  const bottomRow = allSkills.filter((_, index) => index % 2 !== 0);
  const duplicatedTopRow = [...topRow, ...topRow];
  const duplicatedBottomRow = [...bottomRow, ...bottomRow];

  return (
    <Container id="skills">
      <Wrapper>
        <Title>Technologies & Tools</Title>
        <Desc>
          A web-first, JavaScript-focused toolkit with the cloud services I ship with.
        </Desc>
        <SliderWrapper>
          <SliderRow>
            <SliderTrack>
              {duplicatedTopRow.map((item, idx) => (
                <SkillItem key={`${item.name}-${idx}`}>
                  <SkillImage src={item.image} alt={item.name} loading="lazy" />
                  <SkillName>{item.name}</SkillName>
                </SkillItem>
              ))}
            </SliderTrack>
          </SliderRow>
          <SliderRow>
            <SliderTrack reverse>
              {duplicatedBottomRow.map((item, idx) => (
                <SkillItem key={`${item.name}-${idx}`}>
                  <SkillImage src={item.image} alt={item.name} loading="lazy" />
                  <SkillName>{item.name}</SkillName>
                </SkillItem>
              ))}
            </SliderTrack>
          </SliderRow>
        </SliderWrapper>
      </Wrapper>
    </Container>
  );
};

export default Skills;
