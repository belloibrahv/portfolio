import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const Card = styled.article`
    width: 100%;
    border-radius: 28px;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0)),
        ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.text_secondary + '22'};
    box-shadow: 0 18px 42px rgba(2, 8, 23, 0.20);
    padding: 22px;
    position: relative;
    overflow: hidden;
    transition:
        transform 220ms ease,
        box-shadow 220ms ease,
        border-color 220ms ease;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at top right, rgba(45, 212, 191, 0.16), transparent 28%),
            radial-gradient(circle at bottom left, rgba(56, 189, 248, 0.12), transparent 32%);
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-6px);
        border-color: rgba(45, 212, 191, 0.26);
        box-shadow: 0 26px 54px rgba(2, 8, 23, 0.28);
    }

    > * {
        position: relative;
        z-index: 1;
    }

    @media only screen and (max-width: 768px) {
        padding: 18px;
        border-radius: 24px;
    }
`;

const Top = styled.div`
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 16px;
    align-items: start;

    @media only screen and (max-width: 768px) {
        grid-template-columns: 58px minmax(0, 1fr);
        gap: 12px;
    }
`;

const LogoShell = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 20px;
    background:
        linear-gradient(135deg, rgba(45, 212, 191, 0.14), rgba(56, 189, 248, 0.10)),
        ${({ theme }) => theme.card_light};
    border: 1px solid ${({ theme }) => theme.text_secondary + '18'};
    display: grid;
    place-items: center;
    overflow: hidden;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);

    @media only screen and (max-width: 768px) {
        width: 58px;
        height: 58px;
        border-radius: 16px;
    }
`;

const Logo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
`;

const FallbackLogo = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    color: ${({ theme }) => theme.text_primary};
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
`;

const Identity = styled.div`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const TitleRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-start;
    justify-content: space-between;
`;

const RoleBlock = styled.div`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Role = styled.h3`
    margin: 0;
    font-size: 1.22rem;
    line-height: 1.25;
    color: ${({ theme }) => theme.text_primary};
    letter-spacing: -0.03em;

    @media only screen and (max-width: 768px) {
        font-size: 1.02rem;
    }
`;

const Company = styled.p`
    margin: 0;
    font-size: 1rem;
    line-height: 1.45;
    color: ${({ theme }) => theme.text_secondary};
    font-weight: 600;

    @media only screen and (max-width: 768px) {
        font-size: 0.94rem;
    }
`;

const MetaRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const MetaChip = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.text_secondary + '18'};
    background: ${({ theme }) => theme.card_light};
    color: ${({ theme }) => theme.text_secondary};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.02em;
`;

const Summary = styled.p`
    width: 100%;
    margin: 2px 0 0;
    font-size: 15px;
    line-height: 1.8;
    color: ${({ theme }) => theme.text_secondary};
    max-width: 72ch;

    @media only screen and (max-width: 768px) {
        font-size: 14px;
        line-height: 1.75;
    }
`;

const Highlights = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px 18px;
    margin: 4px 0 0;
    padding: 0;
    list-style: none;

    @media only screen and (min-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const Highlight = styled.li`
    position: relative;
    padding-left: 18px;
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.text_secondary};

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.82em;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2dd4bf 0%, #38bdf8 100%);
        transform: translateY(-50%);
        box-shadow: 0 0 0 6px rgba(45, 212, 191, 0.08);
    }
`;

const Skills = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
`;

const SkillPill = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.card_light};
    border: 1px solid ${({ theme }) => theme.text_secondary + '18'};
    padding: 6px 10px;
    border-radius: 999px;
    letter-spacing: 0.01em;
`;

const FooterRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
`;

const FooterChip = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(45, 212, 191, 0.20);
    background: rgba(45, 212, 191, 0.08);
    color: ${({ theme }) => theme.text_primary};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.02em;
`;

const makeInitials = (company = '') =>
    company
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

const ExperienceCard = ({ experience }) => {
    const [imageError, setImageError] = useState(false);

    const initials = useMemo(() => makeInitials(experience.company), [experience.company]);
    const isCurrent = /present/i.test(experience.date || '');
    const isRemote = /remote/i.test(experience.location || '');
    const badges = [
        isCurrent ? 'Current role' : 'Selected role',
        isRemote ? 'Remote' : 'Onsite / Hybrid',
    ];

    return (
        <Card>
            <Top>
                <LogoShell>
                    {!imageError && experience.img ? (
                        <Logo
                            src={experience.img}
                            alt={`${experience.company} logo`}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <FallbackLogo>{initials}</FallbackLogo>
                    )}
                </LogoShell>

                <Identity>
                    <TitleRow>
                        <RoleBlock>
                            <Role>{experience.role}</Role>
                            <Company>{experience.company}</Company>
                        </RoleBlock>
                        <MetaChip>{experience.date}</MetaChip>
                    </TitleRow>

                    <MetaRow>
                        {experience.location && <MetaChip>{experience.location}</MetaChip>}
                        {badges.map((badge) => (
                            <MetaChip key={badge}>{badge}</MetaChip>
                        ))}
                    </MetaRow>
                </Identity>
            </Top>

            {experience.summary && <Summary>{experience.summary}</Summary>}

            {experience.highlights && experience.highlights.length > 0 ? (
                <Highlights>
                    {experience.highlights.map((highlight) => (
                        <Highlight key={highlight}>{highlight}</Highlight>
                    ))}
                </Highlights>
            ) : (
                experience?.desc && <Summary>{experience.desc}</Summary>
            )}

            {experience?.skills && experience.skills.length > 0 && (
                <Skills>
                    {experience.skills.map((skill) => (
                        <SkillPill key={skill}>{skill}</SkillPill>
                    ))}
                </Skills>
            )}

            <FooterRow>
                {isCurrent && <FooterChip>Leading delivery today</FooterChip>}
                <FooterChip>{experience.company}</FooterChip>
            </FooterRow>
        </Card>
    );
};

export default ExperienceCard;
