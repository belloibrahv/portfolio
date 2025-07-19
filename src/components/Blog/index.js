import React, { useState, useRef, useEffect } from 'react';
import { Container, Wrapper, Title, Desc, CarouselContainer, CarouselTrack, BlogCard, CardImage, CardContent, CardTitle, CardDescription, CardMeta, CardTags, Tag, CarouselButton, CarouselDots, Dot, BlogModal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalClose, ModalImage, ModalMeta, ModalTags } from './BlogStyle';
import { blogs } from '../../data/constants';

const Blog = ({ openBlogModal, setOpenBlogModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const totalSlides = blogs.length;
  const slidesToShow = 3;

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % (totalSlides - slidesToShow + 1));
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides, slidesToShow]);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - slidesToShow));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleCardClick = (blog) => {
    setOpenBlogModal({ state: true, blog: blog });
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <Container id="blog">
      <Wrapper>
        <Title>Latest Blog Posts</Title>
        <Desc>
          Sharing insights, tutorials, and thoughts on web development, technology, and software engineering.
        </Desc>
        
        <CarouselContainer 
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselButton 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
            className="prev"
          >
            ‹
          </CarouselButton>
          
          <CarouselTrack 
            style={{ 
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` 
            }}
          >
            {blogs.map((blog) => (
              <BlogCard key={blog.id} onClick={() => handleCardClick(blog)}>
                <CardImage src={blog.image} alt={blog.title} />
                <CardContent>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.description}</CardDescription>
                  <CardMeta>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                    <span>•</span>
                    <span>{blog.category}</span>
                  </CardMeta>
                  <CardTags>
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </CardTags>
                </CardContent>
              </BlogCard>
            ))}
          </CarouselTrack>
          
          <CarouselButton 
            onClick={nextSlide} 
            disabled={currentSlide >= totalSlides - slidesToShow}
            className="next"
          >
            ›
          </CarouselButton>
        </CarouselContainer>

        <CarouselDots>
          {Array.from({ length: totalSlides - slidesToShow + 1 }, (_, index) => (
            <Dot 
              key={index} 
              active={index === currentSlide}
              onClick={() => goToSlide(index)}
            />
          ))}
        </CarouselDots>
      </Wrapper>

      {openBlogModal.state && (
        <BlogModal>
          <ModalOverlay onClick={() => setOpenBlogModal({ state: false, blog: null })} />
          <ModalContent>
            <ModalClose onClick={() => setOpenBlogModal({ state: false, blog: null })}>
              ×
            </ModalClose>
            <ModalImage src={openBlogModal.blog.image} alt={openBlogModal.blog.title} />
            <ModalHeader>
              <h2>{openBlogModal.blog.title}</h2>
              <ModalMeta>
                <span>{openBlogModal.blog.date}</span>
                <span>•</span>
                <span>{openBlogModal.blog.readTime}</span>
                <span>•</span>
                <span>{openBlogModal.blog.category}</span>
                <span>•</span>
                <span>By {openBlogModal.blog.author}</span>
              </ModalMeta>
              <ModalTags>
                {openBlogModal.blog.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </ModalTags>
            </ModalHeader>
            <ModalBody 
              dangerouslySetInnerHTML={{ __html: openBlogModal.blog.content }}
            />
          </ModalContent>
        </BlogModal>
      )}
    </Container>
  );
};

export default Blog; 