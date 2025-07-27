import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  width: 100%;
  max-width: 350px;
  min-height: 520px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 14px;
  box-shadow: 0 0 16px 4px rgba(0,0,0,0.12);
  overflow: hidden;
  padding: 28px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.4s cubic-bezier(.4,2,.6,1);
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 0 50px 8px rgba(0,0,0,0.18);
    filter: brightness(1.08);
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    min-height: 480px;
    padding: 24px 16px 16px 16px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0,0,0,0.08);
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary + 15};
  padding: 3px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0px 2px;
`;
const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
`;
const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  margin-top: 8px;
  font-size: 15px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
const Section = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
`;
const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;
const ActionButton = styled.a`
  padding: 8px 16px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.primary + 'cc'};
  }
`;
const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0,0,0,0.08);
  border: 2px solid ${({ theme }) => theme.card};
`;

const ProjectCards = ({project, setOpenModal}) => {
  return (
    <Card onClick={() => setOpenModal && setOpenModal({state: true, project: project})}>
      {project.image && <Image src={project.image} alt={project.title} />}
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>
      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
      </Details>
      {project.problem && (
        <Section><b>Problem:</b> {project.problem}</Section>
      )}
      {project.outcome && (
        <Section><b>Outcome:</b> {project.outcome}</Section>
      )}
      <Actions>
        {project.webapp && <ActionButton href={project.webapp} target="_blank" rel="noopener noreferrer">Live Demo</ActionButton>}
        {project.github && <ActionButton href={project.github} target="_blank" rel="noopener noreferrer">GitHub</ActionButton>}
        {project.media && <ActionButton href={project.media} target="_blank" rel="noopener noreferrer">Media</ActionButton>}
      </Actions>
      {project.member && project.member.length > 0 && (
        <Members>
          {project.member.map((member, idx) => (
            <Avatar key={idx} src={member.img} title={member.name} />
          ))}
        </Members>
      )}
    </Card>
  )
}

export default ProjectCards