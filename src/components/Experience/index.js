import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences, heroStats, workPrinciples } from '../../data/constants';

const Container = styled.section`
    background:
        radial-gradient(circle at 15% 12%, rgba(45, 212, 191, 0.10), transparent 30%),
        radial-gradient(circle at 85% 8%, rgba(56, 189, 248, 0.12), transparent 32%),
        linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.16) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    padding: 72px 0 96px;

    @media (max-width: 960px) {
        padding: 56px 0 76px;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1240px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (max-width: 960px) {
        gap: 24px;
    }
`;

const Header = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    max-width: 820px;
`;

const Eyebrow = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(45, 212, 191, 0.22);
    background: rgba(15, 23, 42, 0.48);
    color: ${({ theme }) => theme.text_secondary};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
`;

const Title = styled.h2`
    margin: 0;
    font-size: clamp(2.4rem, 5vw, 4.2rem);
    line-height: 1.05;
    color: ${({ theme }) => theme.text_primary};
    letter-spacing: -0.04em;
`;

const Description = styled.p`
    margin: 0;
    max-width: 720px;
    font-size: 18px;
    line-height: 1.8;
    color: ${({ theme }) => theme.text_secondary};

    @media (max-width: 768px) {
        font-size: 16px;
        line-height: 1.75;
    }
`;

const IntroGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
    gap: 28px;
    align-items: start;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

const Snapshot = styled(motion.aside)`
    position: sticky;
    top: 108px;
    border-radius: 30px;
    padding: 24px;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01)),
        ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.text_secondary + '24'};
    box-shadow: 0 24px 52px rgba(2, 8, 23, 0.24);
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at top right, rgba(45, 212, 191, 0.18), transparent 28%),
            radial-gradient(circle at bottom left, rgba(56, 189, 248, 0.14), transparent 32%);
        pointer-events: none;
    }

    > * {
        position: relative;
        z-index: 1;
    }

    @media (max-width: 960px) {
        position: relative;
        top: 0;
        padding: 20px;
        border-radius: 24px;
    }
`;

const SnapshotTitle = styled.h3`
    margin: 0;
    font-size: 1.55rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.text_primary};
    letter-spacing: -0.03em;
`;

const SnapshotText = styled.p`
    margin: 0;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.75;
    font-size: 15px;
`;

const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-top: 18px;

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

const Stat = styled.div`
    padding: 14px 12px;
    border-radius: 18px;
    background: ${({ theme }) => theme.card_light};
    border: 1px solid ${({ theme }) => theme.text_secondary + '18'};
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const StatValue = styled.div`
    font-size: 1rem;
    font-weight: 800;
    color: ${({ theme }) => theme.text_primary};
`;

const StatLabel = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.4;
`;

const Principles = styled.div`
    display: grid;
    gap: 12px;
    margin-top: 18px;
`;

const Principle = styled.div`
    padding: 14px 0;
    border-top: 1px solid ${({ theme }) => theme.text_secondary + '1a'};
    display: grid;
    grid-template-columns: 16px minmax(0, 1fr);
    gap: 12px;
    align-items: start;

    &:first-child {
        border-top: 0;
        padding-top: 0;
    }
`;

const PrincipleDot = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 6px;
    background: linear-gradient(135deg, #2dd4bf 0%, #38bdf8 100%);
    box-shadow: 0 0 0 6px rgba(45, 212, 191, 0.12);
`;

const PrincipleBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const PrincipleTitle = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
`;

const PrincipleText = styled.div`
    font-size: 13px;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary};
`;

const Timeline = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-left: 2px;
`;

const TimelineItem = styled(motion.div)`
    display: grid;
    grid-template-columns: 66px minmax(0, 1fr);
    gap: 18px;
    align-items: start;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 12px;
    }
`;

const Rail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 12px;
    min-height: 100%;

    @media (max-width: 960px) {
        display: none;
    }
`;

const RailLabel = styled.div`
    min-height: 28px;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.72);
    border: 1px solid rgba(45, 212, 191, 0.18);
    color: ${({ theme }) => theme.text_secondary};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
`;

const RailDot = styled.span`
    width: 15px;
    height: 15px;
    margin-top: 16px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #7df7ea 0%, #2dd4bf 45%, #0f172a 100%);
    box-shadow:
        0 0 0 10px rgba(45, 212, 191, 0.09),
        0 0 24px rgba(45, 212, 191, 0.32);
    position: relative;
    z-index: 2;
`;

const RailLine = styled.span`
    width: 2px;
    flex: 1;
    min-height: 100px;
    margin-top: 10px;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(45, 212, 191, 0.7), rgba(56, 189, 248, 0.16));
`;

const CardShell = styled.div`
    min-width: 0;
`;

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: index * 0.08,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const Experience = () => {
    return (
        <Container id="experience">
            <Wrapper>
                <Header
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                >
                    <Eyebrow>Career timeline</Eyebrow>
                    <Title>Experience</Title>
                    <Description>
                        Leadership, delivery, and hands-on engineering across startup, enterprise, and public-sector teams.
                    </Description>
                </Header>

                <IntroGrid>
                    <Snapshot
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <SnapshotTitle>What I bring to a team</SnapshotTitle>
                        <SnapshotText>
                            A steady delivery style, a practical product mindset, and the technical range to move from frontend details to system-level decisions.
                        </SnapshotText>

                        <StatGrid>
                            {heroStats.map((stat) => (
                                <Stat key={stat.label}>
                                    <StatValue>{stat.value}</StatValue>
                                    <StatLabel>{stat.label}</StatLabel>
                                </Stat>
                            ))}
                        </StatGrid>

                        <Principles>
                            {workPrinciples.map((principle) => (
                                <Principle key={principle.title}>
                                    <PrincipleDot />
                                    <PrincipleBody>
                                        <PrincipleTitle>{principle.title}</PrincipleTitle>
                                        <PrincipleText>{principle.description}</PrincipleText>
                                    </PrincipleBody>
                                </Principle>
                            ))}
                        </Principles>
                    </Snapshot>

                    <Timeline>
                        {experiences.map((experience, index) => {
                            const railLabel = experience.date?.split(' - ')?.[0] || experience.date || '';
                            return (
                                <TimelineItem
                                    key={experience.id || `${experience.role}-${index}`}
                                    custom={index}
                                    variants={itemVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.22 }}
                                >
                                    <Rail aria-hidden="true">
                                        <RailLabel>{railLabel}</RailLabel>
                                        <RailDot />
                                        {index !== experiences.length - 1 && <RailLine />}
                                    </Rail>
                                    <CardShell>
                                        <ExperienceCard experience={experience} />
                                    </CardShell>
                                </TimelineItem>
                            );
                        })}
                    </Timeline>
                </IntroGrid>
            </Wrapper>
        </Container>
    );
};

export default Experience;
