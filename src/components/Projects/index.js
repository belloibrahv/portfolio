import React from 'react'
import { useState } from 'react'
import Slider from 'react-slick'
import { Container, Wrapper, Title, Desc, CarouselContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  
  // Get filtered projects based on toggle
  const getFilteredProjects = () => {
    if (toggle === 'all') {
      return projects;
    }
    return projects.filter((item) => item.category === toggle);
  };

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      }
    ]
  };

  const filteredProjects = getFilteredProjects();

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'android app' ?
            <ToggleButton active value="android app" onClick={() => setToggle('android app')}>ANDROID APP'S</ToggleButton>
            :
            <ToggleButton value="android app" onClick={() => setToggle('android app')}>ANDROID APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'machine learning' ?
            <ToggleButton active value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
            :
            <ToggleButton value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
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
}

export default Projects