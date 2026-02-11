import React, { useState, useMemo, useCallback } from 'react'
import Slider from 'react-slick'
import { Container, Wrapper, Title, Desc, CarouselContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const Projects = React.memo(({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  
  // Memoize filtered projects to avoid recalculation on every render
  const filteredProjects = useMemo(() => {
    if (toggle === 'all') {
      return projects;
    }
    return projects.filter((item) => item.category === toggle);
  }, [toggle]);

  // Memoize toggle handler
  const handleToggle = useCallback((newToggle) => {
    setToggle(newToggle);
  }, []);

  const totalSlides = filteredProjects.length;
  const baseSlides = Math.min(3, totalSlides || 1);
  const tabletSlides = Math.min(2, totalSlides || 1);
  const mobileSlides = 1;

  // Memoize carousel settings
  const carouselSettings = useMemo(() => ({
    dots: true,
    infinite: totalSlides > baseSlides,
    speed: 500,
    slidesToShow: baseSlides,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: tabletSlides,
          slidesToScroll: 1,
          infinite: totalSlides > tabletSlides,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: mobileSlides,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          infinite: totalSlides > mobileSlides,
        }
      }
    ]
  }), [totalSlides, baseSlides, tabletSlides, mobileSlides]);

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          Selected work across web platforms, dashboards, and data products built for performance and clarity.
        </Desc>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => handleToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => handleToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => handleToggle('web app')}>Web Apps</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => handleToggle('web app')}>Web Apps</ToggleButton>
          }
          <Divider />
          {toggle === 'android app' ?
            <ToggleButton active value="android app" onClick={() => handleToggle('android app')}>Android Apps</ToggleButton>
            :
            <ToggleButton value="android app" onClick={() => handleToggle('android app')}>Android Apps</ToggleButton>
          }
          <Divider />
          {toggle === 'machine learning' ?
            <ToggleButton active value="machine learning" onClick={() => handleToggle('machine learning')}>Machine Learning</ToggleButton>
            :
            <ToggleButton value="machine learning" onClick={() => handleToggle('machine learning')}>Machine Learning</ToggleButton>
          }
          <Divider />
          {toggle === 'open source' ?
            <ToggleButton active value="open source" onClick={() => handleToggle('open source')}>Open Source</ToggleButton>
            :
            <ToggleButton value="open source" onClick={() => handleToggle('open source')}>Open Source</ToggleButton>
          }
        </ToggleButtonGroup>
        <CarouselContainer>
          {filteredProjects.length > 0 ? (
            <Slider {...carouselSettings}>
              {filteredProjects.map((project, index) => (
                <div key={`${project.id || index}`}>
                  <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
                </div>
              ))}
            </Slider>
          ) : (
            <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
              No projects found in this category.
            </div>
          )}
        </CarouselContainer>
      </Wrapper>
    </Container>
  )
});

export default Projects;
