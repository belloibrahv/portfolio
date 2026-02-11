import React from 'react'
import styled from 'styled-components'

const Description = styled.div`
    width: 100%;
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 8px;
    white-space: pre-line;
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`

const Span = styled.span`
overflow: hidden;
display: -webkit-box;
max-width: 100%;
-webkit-line-clamp: 6;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
`

const Card = styled.div`
    width: 100%;
    max-width: 760px;
    border-radius: 16px;
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.text_secondary + "22"};
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
    padding: 20px 22px;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.3s ease-in-out;
    &:hover{
        box-shadow: 0 18px 36px rgba(0,0,0,0.16);
        transform: translateY(-4px);
    }
    @media only screen and (max-width: 768px){
        padding: 16px;
        gap: 8px;
        width: 100%;
    }
`

const Top = styled.div`
    width: 100%;
    display: flex;
    gap: 12px
`

const Image = styled.img`
    width: 54px;
    height: 54px;
    object-fit: contain;
    background-color: ${({ theme }) => theme.card_light};
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.text_secondary + "22"};
    margin-top: 4px;
    @media only screen and (max-width: 768px){
        width: 46px;
        height: 46px;
    }
`

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column; 
`


const Role = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    @media only screen and (max-width: 768px){
        font-size: 15px;
    }
`

const Company = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`

const Date = styled.div`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Skills = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    margin-top: 4px;
    align-items: flex-start;
`

const ItemWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

const SkillPill = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.text_secondary + "18"};
    padding: 4px 10px;
    border-radius: 999px;
    @media only screen and (max-width: 768px){
        font-size: 11px;
    }
`



const ExperienceCard = ({ experience }) => {
    return (
        <Card>
            <Top>
                <Image src={experience.img} />
                <Body>
                    <Role>{experience.role}</Role>
                    <Company>{experience.company}</Company>
                    <Date>{experience.date}</Date>
                </Body>
            </Top>
            <Description>
                {experience?.desc &&
                    <Span>{experience?.desc}</Span>
                }
                {experience?.problem && experience.problem.trim() !== '' && (
                  <>
                    <br />
                    <b>Problem Solved:</b>
                    <Span>{experience.problem}</Span>
                  </>
                )}
                {experience?.outcome && experience.outcome.trim() !== '' && (
                  <>
                    <br />
                    <b>Outcome/Impact:</b>
                    <Span>{experience.outcome}</Span>
                  </>
                )}
                {experience?.skills &&
                    <>
                        <br />
                        <Skills>
                            <b>Skills:</b>
                            <ItemWrapper>
                                {experience?.skills?.map((skill, index) => (
                                    <SkillPill key={index}>{skill}</SkillPill>
                                ))}
                            </ItemWrapper>
                        </Skills>
                    </>
                }
            </Description>
        </Card>
    )
}

export default ExperienceCard
