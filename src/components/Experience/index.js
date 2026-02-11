
import React from 'react'
import styled from 'styled-components'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences } from '../../data/constants';

const Container = styled.div`
    background: radial-gradient(circle at 20% 20%, rgba(0, 201, 167, 0.08), transparent 35%),
        radial-gradient(circle at 80% 10%, rgba(132, 94, 194, 0.12), transparent 35%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 60px 0px 90px 0px;
    @media (max-width: 960px) {
        padding: 40px 0px 70px 0px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    gap: 16px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 700;
margin-top: 10px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 8px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    line-height: 1.7;
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 980px;
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;



const index = () => {
    return (
        <Container id="experience">
            <Wrapper>
                <Title>Experience</Title>
                <Desc>
                    A track record of shipping web products and platforms across startups, enterprises, and public sector teams.
                </Desc>
                <TimelineSection>
                    <Timeline
                        sx={{
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        {experiences.map((experience,index) => (
                            <TimelineItem key={experience.id || `${experience.role}-${index}`}>
                                <TimelineSeparator>
                                    <TimelineDot
                                        variant="outlined"
                                        color="secondary"
                                        sx={{ borderColor: '#845EC2', boxShadow: '0 0 0 6px rgba(132, 94, 194, 0.08)' }}
                                    />
                                    {index !== experiences.length - 1 && (
                                        <TimelineConnector style={{ background: 'rgba(132, 94, 194, 0.35)' }} />
                                    )}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <ExperienceCard experience={experience}/>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>

                </TimelineSection>
            </Wrapper>
        </Container>
    )
}

export default index
