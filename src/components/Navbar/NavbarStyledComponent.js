import { Link as LinkR } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: ${({ theme, scrolled }) =>
    scrolled ? `${theme.card_light}ee` : theme.card_light};
  backdrop-filter: ${({ scrolled }) => (scrolled ? 'blur(12px)' : 'none')};
  -webkit-backdrop-filter: ${({ scrolled }) => (scrolled ? 'blur(12px)' : 'none')};
  box-shadow: ${({ scrolled }) =>
    scrolled ? '0 4px 24px rgba(0,0,0,0.12)' : 'none'};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  @media (max-width: 960px) {
    transition: 0.3s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
`;

export const NavLogo = styled(LinkR)`
  width: auto;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 640px) {
    padding: 0;
  }
`;

export const Span = styled.div`
  padding: 0 4px;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #00C9A7 0%, #845EC2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.2s forwards;
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

export const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 0 6px;
  list-style: none;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const NavLink = styled.span`
  color: ${({ theme, active }) => (active ? theme.primary : theme.text_primary)};
  font-weight: 500;
  cursor: pointer;
  transition: color 0.25s ease, transform 0.25s ease;
  text-decoration: none;
  font-size: 0.95rem;
  position: relative;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ active }) => (active ? '100%' : '0')};
    height: 2px;
    background: linear-gradient(90deg, #00C9A7, #845EC2);
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }
`;

export const GitHubButton = styled.a`
  border: 1.8px solid ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0 20px;
  border-radius: 12px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    transform: translateY(-2px);
  }
  @media screen and (max-width: 768px) {
    font-size: 0.85rem;
    min-height: 44px;
    padding: 0 16px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 0 6px;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const MobileIcon = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  padding: 10px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.5rem;
  @media screen and (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  padding: 24px 40px 32px;
  background: ${({ theme }) => `${theme.card_light}fa`};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  border-radius: 0 0 20px 20px;
  animation: slideDown 0.3s ease;
  z-index: 999;
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MobileLink = styled.span`
  color: ${({ theme, active }) => (active ? theme.primary : theme.text_primary)};
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  text-decoration: none;
  font-size: 1.1rem;
  display: inline-block;
  min-height: 44px;
  line-height: 44px;
  padding: 0 8px;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const MobileMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  width: 100%;
`;

export const MobileMenuLink = styled(LinkR)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const MobileMenuButton = styled.a`
  border: 1.8px solid ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  height: 70%;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0 20px;
  font-weight: 500;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.6s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

export const MobileNavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration: none;
  @media (max-width: 640px) {
    padding: 0;
  }
`;
