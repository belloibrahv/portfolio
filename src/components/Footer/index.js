import React from 'react';
import styled from 'styled-components';
import { Bio } from '../../data/constants';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.card};
  padding: 32px 0 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.text_secondary}22;
`;

const Socials = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 12px;
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.primary};
  font-size: 28px;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Links = styled.div`
  display: flex;
  gap: 18px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Signature = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <Socials>
        <SocialIcon href={Bio.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </SocialIcon>
        <SocialIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </SocialIcon>
        <SocialIcon href={Bio.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter />
        </SocialIcon>
      </Socials>
      <Links>
        <Link href="#about">About</Link>
        <Link href="#projects">Projects</Link>
        <Link href="#skills">Skills</Link>
        <Link href="#experience">Experience</Link>
        <Link href="#education">Education</Link>
        <Link href="#contact">Contact</Link>
        <Link href={Bio.resume} target="_blank" rel="noopener noreferrer">Resume</Link>
      </Links>
      <Signature>
        © {new Date().getFullYear()} Ibrahim Bello — Built with passion for global impact.<br />
        Designed & coded by Ibrahim Bello.
      </Signature>
    </FooterContainer>
  );
}

export default Footer;
