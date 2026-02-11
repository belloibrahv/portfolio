import React, { useState, useEffect } from 'react';
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from './NavbarStyledComponent';
import { Link as LinkScroll } from 'react-scroll';
import { HiCode } from 'react-icons/hi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Bio } from '../../data/constants';

const NAV_LINKS = [
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'experience', label: 'Experience' },
  { to: 'projects', label: 'Projects' },
  { to: 'blog', label: 'Blog' },
  { to: 'education', label: 'Education' },
  { to: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map(({ to }) => document.getElementById(to)).filter(Boolean);
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <Nav scrolled={scrolled} isOpen={isOpen}>
      <NavbarContainer>
        <NavLogo to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <a href="/" style={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none", cursor: "pointer" }}>
            <HiCode size="1.8rem" style={{ marginRight: 8 }} />
            <Span>{Bio.name.split(' ')[0]}</Span>
          </a>
        </NavLogo>
        <MobileIcon onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileIcon>
        <NavItems>
          {NAV_LINKS.map(({ to, label }) => (
            <LinkScroll
              key={to}
              to={to}
              spy
              smooth
              offset={-80}
              duration={500}
              activeClass="active"
              onSetActive={() => setActiveSection(to)}
              onClick={closeMobileMenu}
            >
              <NavLink as="span" active={activeSection === to}>
                {label}
              </NavLink>
            </LinkScroll>
          ))}
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </GitHubButton>
          <LinkScroll to="contact" smooth offset={-80} duration={500}>
            <GitHubButton as="span" style={{ marginLeft: 12, background: 'linear-gradient(90deg, #00C9A7 0%, #845EC2 100%)', border: 'none', color: '#fff' }}>
              Let's Talk
            </GitHubButton>
          </LinkScroll>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            {NAV_LINKS.map(({ to, label }) => (
              <LinkScroll key={to} to={to} smooth offset={-80} duration={500} onClick={closeMobileMenu}>
                <MobileLink as="span" active={activeSection === to}>
                  {label}
                </MobileLink>
              </LinkScroll>
            ))}
            <GitHubButton href={Bio.github} target="_blank" rel="noopener noreferrer" style={{ marginTop: 8 }}>
              GitHub
            </GitHubButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
