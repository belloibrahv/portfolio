import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  width: 100%;
  max-width: 350px;
  height: 560px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
  border: 1px solid ${({ theme }) => theme.text_secondary + "22"};
  overflow: hidden;
  padding: 28px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.4s cubic-bezier(.4,2,.6,1);
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.16);
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    height: 520px;
    padding: 24px 16px 16px 16px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.card};
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
  max-height: 64px;
  overflow: hidden;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  background-color: ${({ theme }) => theme.text_secondary + "20"};
  padding: 4px 10px;
  border-radius: 999px;
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
  min-height: 140px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
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
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
  font-size: 15px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Section = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 auto;
  overflow: hidden;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
`;
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const ActionButton = styled.a`
  min-height: 38px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border-radius: 999px;
  font-weight: 600;
  font-size: 13px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.primary + 'cc'};
  }
  @media (max-width: 480px) {
    min-height: 40px;
    padding: 8px 14px;
    font-size: 13px;
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
  const tags = project.tags || [];
  const maxTags = 8;
  const visibleTags = tags.slice(0, maxTags);
  const hasMoreTags = tags.length > maxTags;

  return (
    <Card onClick={() => setOpenModal && setOpenModal({state: true, project: project})}>
      {project.image && <Image src={project.image} alt={project.title} />}
      <Content>
        <Tags>
          {visibleTags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
          {hasMoreTags && <Tag>...</Tag>}
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
      </Content>
      <Footer>
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
      </Footer>
    </Card>
  )
}

export default ProjectCards
