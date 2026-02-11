import styled from 'styled-components';

export const Container = styled.div`
  background: radial-gradient(circle at 20% 20%, rgba(132, 94, 194, 0.12), transparent 35%),
    radial-gradient(circle at 80% 10%, rgba(0, 201, 167, 0.08), transparent 35%);
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
  max-width: 1200px;
  padding: 30px 20px 110px;
  gap: 16px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  margin-top: 12px;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 3px;
    bottom: -10px;
    left: 25%;
    background: linear-gradient(90deg, #00C9A7 0%, rgba(132, 94, 194, 0.9) 100%);
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
  line-height: 1.7;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

export const FeaturedSection = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-top: 18px;
`;

export const FeaturedCard = styled.div`
  position: relative;
  width: 100%;
  min-height: 360px;
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  padding: 32px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  border: 1px solid ${({ theme }) => theme.text_secondary + "22"};

  @media (max-width: 768px) {
    min-height: 320px;
    padding: 22px;
  }
`;

export const FeaturedImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(10, 12, 22, 0.75) 10%, rgba(10, 12, 22, 0.4) 60%, rgba(10, 12, 22, 0.85) 100%);
`;

export const FeaturedContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: ${({ theme }) => theme.white};
`;

export const FeaturedBadge = styled.span`
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: rgba(0, 201, 167, 0.2);
  color: #ffffff;
  border: 1px solid rgba(0, 201, 167, 0.4);
`;

export const FeaturedTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const FeaturedDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const FeaturedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    
    &::before {
      content: '•';
      margin: 0 5px;
      color: rgba(255, 255, 255, 0.7);
    }
    
    &:first-child::before {
      display: none;
    }
  }
`;

export const ArticlesContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 24px auto 0;
  padding: 0 10px;
`;

export const ArticlesScroller = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(260px, 1fr);
  gap: 20px;
  overflow-x: auto;
  padding: 10px 6px 20px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.primary} transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary + "66"};
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 768px) {
    grid-auto-columns: minmax(220px, 1fr);
  }
`;

export const ArticleCard = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  scroll-snap-align: start;
  border: 1px solid ${({ theme }) => theme.text_secondary + "18"};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ArticleImage = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ArticleCard}:hover & {
    transform: scale(1.03);
  }
  
  @media (max-width: 768px) {
    height: 170px;
  }
`;

export const ArticleContent = styled.div`
  padding: 20px 22px 24px;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 18px;
  }
`;

export const ArticleTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
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
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin-bottom: 14px;
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
  margin-bottom: 12px;
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
  margin-top: 10px;
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
  min-width: 48px;
  min-height: 48px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  
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
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    font-size: 18px;
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
  min-width: 28px;
  min-height: 28px;
  padding: 8px;
  border-radius: 50%;
  background: ${({ active, theme }) => active ? theme.primary : theme.text_secondary + '40'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  
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
  min-width: 44px;
  min-height: 44px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: scale(1.1);
  }
  
  @media (max-width: 480px) {
    top: 12px;
    right: 12px;
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
