import React from 'react';
import { 
  Container, 
  Wrapper, 
  Title, 
  Desc, 
  FeaturedSection,
  FeaturedCard,
  FeaturedImage,
  FeaturedOverlay,
  FeaturedContent,
  FeaturedBadge,
  FeaturedTitle,
  FeaturedDescription,
  FeaturedMeta,
  ArticlesContainer, 
  ArticlesScroller,
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

  const featured = blogs[0];
  const carouselBlogs = blogs.slice(1, 6);

  return (
    <Container id="articles">
      <Wrapper>
        <Title>Latest Articles</Title>
        <Desc>
          Sharing insights, tutorials, and thoughts on technology, software development, and more.
        </Desc>

        {featured && (
          <FeaturedSection>
            <FeaturedCard
              onClick={() => handleArticleClick(featured)}
              aria-label={`Read featured article: ${featured.title}`}
            >
              <FeaturedImage src={featured.image} alt={featured.title} loading="lazy" />
              <FeaturedOverlay />
              <FeaturedContent>
                <FeaturedBadge>Featured</FeaturedBadge>
                <FeaturedTitle>{featured.title}</FeaturedTitle>
                <FeaturedDescription>{featured.description}</FeaturedDescription>
                <FeaturedMeta>
                  <span>{formatDate(featured.date)}</span>
                  <span>{featured.readTime}</span>
                  <span>{featured.category}</span>
                </FeaturedMeta>
                <ArticleTags>
                  {featured.tags.slice(0, 4).map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                  {featured.tags.length > 4 && <Tag>...</Tag>}
                </ArticleTags>
              </FeaturedContent>
            </FeaturedCard>
          </FeaturedSection>
        )}

        <ArticlesContainer>
          <ArticlesScroller>
            {carouselBlogs.map((blog) => (
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
                  </ArticleMeta>
                  <ArticleTags>
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                    {blog.tags.length > 3 && <Tag>...</Tag>}
                  </ArticleTags>
                </ArticleContent>
              </ArticleCard>
            ))}
          </ArticlesScroller>
        </ArticlesContainer>
      </Wrapper>
    </Container>
  );
};

export default Blog; 
