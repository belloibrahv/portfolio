
import React from 'react'
import styled from 'styled-components'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { education as educationList, communityHighlights } from '../../data/constants';
import EducationCard from '../Cards/EducationCard';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 0px 0px 76px 0px;
    @media (max-width: 960px) {
        padding: 0px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 40px 0px 0px 0px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;

const CommunityGrid = styled.div`
    width: 100%;
    max-width: 980px;
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const CommunityCard = styled.div`
    padding: 18px;
    border-radius: 18px;
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.text_secondary + "1f"};
    box-shadow: 0 14px 28px rgba(2, 8, 23, 0.12);
`;

const CommunityTitle = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 8px;
`;

const CommunityText = styled.div`
    font-size: 14px;
    line-height: 1.7;
    color: ${({ theme }) => theme.text_secondary};
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    @media (max-width: 660px) {
        align-items: end;
    }
`;



const index = () => {
    return (
        <Container id="education">
            <Wrapper>
                <Title>Education & Community</Title>
                <Desc>
                    A degree in computer science, plus the community work and scholarship experience that shaped how I build.
                </Desc>
                <TimelineSection>
                    <Timeline>
                        {educationList.map((education,index) => (
                            <TimelineItem key={education.id || index}>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <EducationCard education={education}/>
                                </TimelineContent>
                                <TimelineSeparator>
                                    <TimelineDot variant="outlined" color="secondary" sx={{ borderColor: '#2DD4BF' }} />
                                    {index !== educationList.length - 1  && <TimelineConnector style={{ background: '#2DD4BF' }} />}
                                </TimelineSeparator>
                            </TimelineItem>
                        ))}
                    </Timeline>

                </TimelineSection>
                <CommunityGrid>
                    {communityHighlights.map((item) => (
                        <CommunityCard key={item.title}>
                            <CommunityTitle>{item.title}</CommunityTitle>
                            <CommunityText>{item.description}</CommunityText>
                        </CommunityCard>
                    ))}
                </CommunityGrid>
            </Wrapper>
        </Container>
    )
}

export default index
