import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Bio, communityHighlights, heroStats, resumeHighlights, workPrinciples } from "../../data/constants";
import HeroImg from "../../images/HeroImage.png";

const Container = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 36px 24px 84px;
  background:
    radial-gradient(circle at 12% 10%, rgba(45, 212, 191, 0.08), transparent 28%),
    radial-gradient(circle at 88% 0%, rgba(56, 189, 248, 0.08), transparent 24%);

  @media (max-width: 768px) {
    padding: 24px 16px 64px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Eyebrow = styled.div`
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2.2px;
  color: ${({ theme }) => theme.primary};
`;

const Title = styled.h2`
  font-size: 42px;
  line-height: 1.08;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  line-height: 1.8;
  max-width: 760px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + "1f"};
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(2, 8, 23, 0.18);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 22px;
  }
`;

const Story = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const StoryText = styled.p`
  font-size: 16px;
  line-height: 1.85;
  color: ${({ theme }) => theme.text_secondary};
`;

const HighlightList = styled.ul`
  display: grid;
  gap: 12px;
  list-style: none;
`;

const HighlightItem = styled.li`
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(45, 212, 191, 0.06);
  border: 1px solid rgba(45, 212, 191, 0.12);
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.65;
`;

const Strong = styled.span`
  display: inline-block;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-right: 6px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AvatarShell = styled.div`
  border-radius: 24px;
  padding: 14px;
  background:
    linear-gradient(145deg, rgba(45, 212, 191, 0.12), rgba(56, 189, 248, 0.08)),
    ${({ theme }) => theme.card_light};
`;

const Avatar = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 20px;
`;

const ProfileTitle = styled.h3`
  font-size: 24px;
  line-height: 1.2;
  color: ${({ theme }) => theme.text_primary};
`;

const ProfileMeta = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 14px;
  border-radius: 16px;
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.text_secondary + "16"};
`;

const StatLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
`;

const StatValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.45;
`;

const SubsectionTitle = styled.h4`
  font-size: 13px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MiniCard = styled.div`
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${({ theme }) => theme.text_secondary + "1f"};
`;

const MiniCardTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
`;

const MiniCardText = styled.div`
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
`;

const About = () => (
  <Container id="about">
    <Wrapper>
      <Eyebrow>About the work</Eyebrow>
      <Title>Built for teams that want clarity, calm, and strong delivery.</Title>
      <Desc>
        I’m {Bio.name}, a product-minded engineer based in Lagos. My work sits at the
        intersection of engineering leadership, hands-on frontend delivery, reliable
        backend systems, and a willingness to go deep on whatever helps the product ship
        well.
      </Desc>

      <Grid>
        <Panel
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Story>
            <SubsectionTitle>What I care about</SubsectionTitle>
            <StoryText>
              {Bio.description}
            </StoryText>
            <HighlightList>
              {resumeHighlights.map((item) => (
                <HighlightItem key={item}>
                  <Strong>Resume signal</Strong>
                  {item}
                </HighlightItem>
              ))}
            </HighlightList>
            <StatGrid>
              {heroStats.map((stat) => (
                <StatCard key={stat.label}>
                  <StatLabel>{stat.label}</StatLabel>
                  <StatValue>{stat.value}</StatValue>
                </StatCard>
              ))}
            </StatGrid>
          </Story>
        </Panel>

        <Panel
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
        >
          <Profile>
            <AvatarShell>
              <Avatar src={HeroImg} alt={`${Bio.name} portrait`} />
            </AvatarShell>
            <ProfileTitle>{Bio.preferredName}</ProfileTitle>
            <ProfileMeta>
              Technical lead, full-stack engineer, and product collaborator. I like working
              on systems that need to be trusted by real people and understood by real teams.
            </ProfileMeta>
            <CardGrid>
              {workPrinciples.map((principle) => (
                <MiniCard key={principle.title}>
                  <MiniCardTitle>{principle.title}</MiniCardTitle>
                  <MiniCardText>{principle.description}</MiniCardText>
                </MiniCard>
              ))}
            </CardGrid>
            <CardGrid>
              {communityHighlights.map((item) => (
                <MiniCard key={item.title}>
                  <MiniCardTitle>{item.title}</MiniCardTitle>
                  <MiniCardText>{item.description}</MiniCardText>
                </MiniCard>
              ))}
            </CardGrid>
          </Profile>
        </Panel>
      </Grid>
    </Wrapper>
  </Container>
);

export default About;
