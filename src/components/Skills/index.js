import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { skills } from "../../data/constants";

const Container = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 52px 24px 88px;
  background:
    radial-gradient(circle at 18% 12%, rgba(45, 212, 191, 0.08), transparent 28%),
    radial-gradient(circle at 82% 14%, rgba(56, 189, 248, 0.08), transparent 28%);

  @media (max-width: 768px) {
    padding: 40px 16px 68px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Eyebrow = styled.div`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
`;

const Title = styled.h2`
  font-size: 42px;
  line-height: 1.08;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.p`
  max-width: 760px;
  font-size: 18px;
  line-height: 1.8;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + "1f"};
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 18px 42px rgba(2, 8, 23, 0.16);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const Category = styled.h3`
  font-size: 22px;
  line-height: 1.2;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Summary = styled.p`
  font-size: 14px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
`;

const Count = styled.span`
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(45, 212, 191, 0.08);
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid rgba(45, 212, 191, 0.14);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const BadgeWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 9px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.text_secondary + "20"};
  color: ${({ theme }) => theme.text_primary};
  font-size: 13px;
  font-weight: 700;
`;

const BadgeIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 999px;
  overflow: hidden;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(56, 189, 248, 0.2));
  color: ${({ theme }) => theme.text_primary};
  font-size: 10px;
  font-weight: 800;
`;

const SkillImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Skills = () => {
  return (
    <Container id="skills">
      <Wrapper>
        <Eyebrow>Capabilities</Eyebrow>
        <Title>Designed to show the full stack without losing the story.</Title>
        <Desc>
          These are the areas where I spend most of my time: building interfaces that feel
          sharp, APIs that stay reliable, and delivery workflows that help teams move with
          confidence.
        </Desc>

        <Grid>
          {skills.map((group, index) => (
            <Card
              key={group.title}
              as={motion.article}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.03 }}
              whileHover={{ y: -4 }}
            >
              <CardTop>
                <div>
                  <Category>{group.title}</Category>
                  <Summary>{group.summary}</Summary>
                </div>
                <Count>{group.skills.length} tools</Count>
              </CardTop>

              <BadgeWrap>
                {group.skills.map((skill) => (
                  <Badge key={skill.name}>
                    <BadgeIcon aria-hidden="true">
                      {skill.image ? (
                        <SkillImage src={skill.image} alt="" loading="lazy" />
                      ) : (
                        skill.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                      )}
                    </BadgeIcon>
                    {skill.name}
                  </Badge>
                ))}
              </BadgeWrap>
            </Card>
          ))}
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default Skills;
