import React from 'react';
import { 
  Container, 
  Wrapper, 
  Title, 
  Desc, 
  ArticlesContainer, 
  ArticleCard, 
  ArticleImage, 
  ArticleContent, 
  ArticleTitle, 
  ArticleDescription, 
  ArticleMeta, 
  ArticleTags, 
  Tag 
} from './BlogStyle';
import { blogs } from '../../data/constants';

const Blog = () => {
  const handleArticleClick = (blog) => {
    // If the blog has a URL, open it in a new tab
    if (blog.url) {
      window.open(blog.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Format date to a more readable format (e.g., "June 15, 2024")
  const formatDate = (dateString) => {
    try {
      // Handle different date formats that might come from the blog data
      let date;
      
      // Try parsing as ISO date string first
      date = new Date(dateString);
      
      // If invalid, try parsing as month year (e.g., "June 2024")
      if (isNaN(date.getTime())) {
        const [month, year] = dateString.split(' ');
        const monthIndex = new Date(Date.parse(month + ' 1, 2000')).getMonth();
        date = new Date(year, monthIndex, 1);
      }
      
      // Format the date
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return original string if parsing fails
    }
  };

  return (
    <Container id="articles">
      <Wrapper>
        <Title>Latest Articles</Title>
        <Desc>
          Sharing insights, tutorials, and thoughts on technology, software development, and more.
        </Desc>
        
        <ArticlesContainer>
          {blogs.map((blog) => (
            <ArticleCard 
              key={blog.id} 
              onClick={() => handleArticleClick(blog)}
              aria-label={`Read article: ${blog.title}`}
            >
              <ArticleImage 
                src={blog.image} 
                alt={blog.title} 
                loading="lazy"
              />
              <ArticleContent>
                <ArticleTitle>{blog.title}</ArticleTitle>
                <ArticleDescription>{blog.description}</ArticleDescription>
                <ArticleMeta>
                  <span>{formatDate(blog.date)}</span>
                  <span>{blog.readTime}</span>
                  <span>{blog.category}</span>
                </ArticleMeta>
                <ArticleTags>
                  {blog.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </ArticleTags>
              </ArticleContent>
            </ArticleCard>
          ))}
        </ArticlesContainer>
      </Wrapper>
    </Container>
  );
};

export default Blog; 