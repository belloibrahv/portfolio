import styled from "styled-components";
// import _default from "../../themes/default";

export const HeroContainer = styled.div`
  background: ${({ theme }) => theme.card_light};
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640) {
    padding: 32px 16px;
  }
  z-index: 1;

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;

export const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 32px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 0;
  }
`;
export const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const HeroRightContainer = styled.div`
  width: 100%;
  display: flex;
  order: 2;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-top: 0;
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

export const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 340px;
  max-height: 340px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.primary};
  box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(132,94,194,0.08);
  object-fit: cover;
  background: #fff;

  @media (max-width: 768px) {
    max-width: 280px;
    max-height: 280px;
  }

  @media (max-width: 640px) {
    max-width: 180px;
    max-height: 180px;
  }

  // Add hover effect
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  &:hover {
    transform: scale(1.05); // Slight scale-up on hover
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.25); // Stronger shadow on hover
  }
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 38px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
  max-width: 480px;
  white-space: normal;
  word-break: break-word;
  @media (max-width: 960px) {
    text-align: center;
    font-size: 32px;
    max-width: 90vw;
  }
  @media (max-width: 640px) {
    font-size: 24px;
    line-height: 1.2;
    margin-bottom: 8px;
    max-width: 98vw;
  }
`;

export const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

export const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

export const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

export const ResumeButton = styled.a`
    display: inline-block;
    text-decoration: none;
    width: 100%;
    max-width: 300px;
    text-align: center;
    padding: 16px 0;
    color: ${({ theme }) => theme.white};
    border-radius: 12px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    border: none;
    outline: none;
    
    // Consistent gradient background
    background: linear-gradient(
        225deg, 
        hsla(271, 100%, 50%, 1) 0%, 
        hsla(294, 100%, 50%, 1) 100%
    );
    
    // Improved transition for smoother hover effect
    transition: all 0.3s ease;
    
    // Cross-browser box-shadow
    box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.08);
    
    // Hover states
    &:hover {
        transform: translateY(-2px); // Subtle lift effect
        box-shadow: 
            0 6px 8px rgba(0, 0, 0, 0.15),
            0 2px 4px rgba(0, 0, 0, 0.12);
        filter: brightness(1.1); // Slight brightness increase
    }
    
    // Active/Focus states for accessibility
    &:active {
        transform: translateY(1px);
        box-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.06);
    }
    
    // Responsive adjustments
    @media (max-width: 640px) {
        padding: 14px 0;
        font-size: 18px;
        max-width: 250px;
    }

    // Ensure consistent appearance across browsers
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
`;
