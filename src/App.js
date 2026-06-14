import { ThemeProvider } from "styled-components";
import { useState, Suspense, lazy } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import styled from "styled-components";
import { CircularProgress, Box } from "@mui/material";

// Lazy load components for better performance
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const ProjectDetails = lazy(() => import("./components/ProjectDetails"));
const Resume = lazy(() => import("./components/Resume"));
const Chatbot = lazy(() => import("./components/Chatbot"));
const Blog = lazy(() => import("./components/Blog"));

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background:
    radial-gradient(circle at 10% 0%, rgba(45, 212, 191, 0.08), transparent 32%),
    radial-gradient(circle at 90% 20%, rgba(56, 189, 248, 0.08), transparent 28%);
  width: 100%;
`

// Loading component
const LoadingSpinner = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress size={40} />
  </Box>
);

function App() {
  const [darkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [openBlogModal, setOpenBlogModal] = useState({ state: false, blog: null });
  
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router >
        <Navbar />
        <Body>
          <HeroSection />
          <About />
          <Suspense fallback={<LoadingSpinner />}>
            <Resume />
          </Suspense>
          <Wrapper>
            <Suspense fallback={<LoadingSpinner />}>
              <Skills />
              <Experience />
            </Suspense>
          </Wrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <Projects openModal={openModal} setOpenModal={setOpenModal} />
          </Suspense>
          <Wrapper>
            <Suspense fallback={<LoadingSpinner />}>
              <Blog openBlogModal={openBlogModal} setOpenBlogModal={setOpenBlogModal} />
              <Education />
              <Contact />
            </Suspense>
          </Wrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Chatbot />
          </Suspense>
          {openModal.state &&
            <Suspense fallback={<LoadingSpinner />}>
              <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
            </Suspense>
          }
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
