import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);
  padding: 80px 0;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 10px 0px 100px 0;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 4px;
    bottom: -10px;
    left: 20%;
    background: linear-gradient(270deg, #854CE6 0%, rgba(60, 0, 150, 0.8) 100%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

export const ArticlesContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 40px auto 0;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const ArticleCard = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ArticleImage = styled.img`
  width: 40%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ArticleCard}:hover & {
    transform: scale(1.03);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

export const ArticleContent = styled.div`
  padding: 30px;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ArticleTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 15px;
  line-height: 1.3;
  transition: color 0.3s ease;
  
  ${ArticleCard}:hover & {
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ArticleDescription = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary + '80'};
  margin-bottom: 18px;
  flex-wrap: wrap;
  
  span {
    display: flex;
    align-items: center;
    
    &::before {
      content: '•';
      margin: 0 5px;
      color: ${({ theme }) => theme.primary};
    }
    
    &:first-child::before {
      display: none;
    }
  }
`;

export const ArticleTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 15px;
`;

export const Tag = styled.span`
  background: ${({ theme }) => theme.primary + '15'};
  color: ${({ theme }) => theme.primary};
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${ArticleCard}:hover & {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary + '20'};
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &.prev {
    left: 0;
  }
  
  &.next {
    right: 0;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;

export const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
`;

export const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active, theme }) => active ? theme.primary : theme.text_secondary + '40'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary + '80'};
    transform: scale(1.2);
  }
`;

// Modal Styles
export const BlogModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  position: relative;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  @media (max-width: 768px) {
    max-width: 95%;
    margin: 10px;
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: scale(1.1);
  }
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
`;

export const ModalHeader = styled.div`
  padding: 32px 32px 24px;
  
  h2 {
    font-size: 28px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 16px;
    line-height: 1.3;
  }
  
  @media (max-width: 768px) {
    padding: 24px 20px 16px;
    
    h2 {
      font-size: 24px;
    }
  }
`;

export const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const ModalTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const ModalBody = styled.div`
  padding: 0 32px 32px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  font-size: 16px;
  
  h2 {
    color: ${({ theme }) => theme.text_primary};
    font-size: 24px;
    font-weight: 600;
    margin: 32px 0 16px 0;
  }
  
  h3 {
    color: ${({ theme }) => theme.text_primary};
    font-size: 20px;
    font-weight: 600;
    margin: 24px 0 12px 0;
  }
  
  p {
    margin-bottom: 16px;
  }
  
  ul {
    margin: 16px 0;
    padding-left: 24px;
  }
  
  li {
    margin-bottom: 8px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px 24px;
    font-size: 15px;
    
    h2 {
      font-size: 20px;
    }
    
    h3 {
      font-size: 18px;
    }
  }
`; 