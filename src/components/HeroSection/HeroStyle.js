import styled from "styled-components";

export const HeroContainer = styled.div`
  background: ${({ theme }) => theme.card_light};
  display: flex;
  justify-content: center;
  position: relative;
  padding: 100px 30px 120px;
  @media (max-width: 960px) {
    padding: 80px 16px 100px;
  }
  @media (max-width: 640px) {
    padding: 60px 16px 80px;
  }
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 97%, 0 100%);
  overflow: hidden;
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
  animation: heroFadeInLeft 0.9s ease-out 0.2s both;
  @keyframes heroFadeInLeft {
    from {
      opacity: 0;
      transform: translateY(32px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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
  animation: heroFadeInRight 0.9s ease-out 0.4s both;
  @keyframes heroFadeInRight {
    from {
      opacity: 0;
      transform: translateY(32px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
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
  object-position: 50% 15%;
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
  font-size: 46px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
  max-width: 480px;
  white-space: normal;
  word-break: break-word;
  @media (max-width: 960px) {
    text-align: center;
    font-size: 36px;
    max-width: 90vw;
  }
  @media (max-width: 640px) {
    font-size: 28px;
    line-height: 1.2;
    margin-bottom: 8px;
    max-width: 98vw;
  }
`;

export const Eyebrow = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
  @media (max-width: 960px) {
    text-align: center;
  }
`;

export const TextLoop = styled.div`
  font-weight: 600;
  font-size: 28px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 48px;
  margin-bottom: 6px;
  @media (max-width: 960px) {
    text-align: center;
    justify-content: center;
  }
  @media (max-width: 640px) {
    font-size: 20px;
    line-height: 40px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
`;

export const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

export const Lead = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin: 12px 0 18px;
  color: ${({ theme }) => theme.text_primary};
  max-width: 560px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 28px;
  }
`;

export const Summary = styled.div`
  font-size: 16px;
  line-height: 28px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 6px 0 22px;
  max-width: 600px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

export const ToolStack = styled.div`
  width: 100%;
  margin: 0 0 26px;
`;

export const ToolStackTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 10px;
  @media (max-width: 960px) {
    text-align: center;
  }
`;

export const ToolPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const ToolPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.card};
  border: 1px solid rgba(132, 94, 194, 0.2);
  border-radius: 999px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(132, 94, 194, 0.18);
  }
  @media (max-width: 640px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

export const ToolIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  @media (max-width: 640px) {
    width: 16px;
    height: 16px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
`;

export const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  min-width: 140px;
  width: 100%;
  max-width: 300px;
  min-height: 48px;
  padding: 14px 24px;
  color: ${({ theme }) => theme.white};
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  border: none;
  outline: none;
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  transition: all 0.3s ease;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 6px 8px rgba(0, 0, 0, 0.15),
      0 2px 4px rgba(0, 0, 0, 0.12);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 20px;
    min-height: 44px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    font-size: 15px;
  }

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  animation: bounce 2s ease-in-out infinite;
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }
  span {
    width: 24px;
    height: 40px;
    border: 2px solid ${({ theme }) => theme.primary};
    border-radius: 12px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 8px;
      background: ${({ theme }) => theme.primary};
      border-radius: 2px;
      animation: scrollDot 2s ease-in-out infinite;
    }
    @keyframes scrollDot {
      0%, 100% { opacity: 1; top: 8px; }
      50% { opacity: 0.3; top: 16px; }
    }
  }
  @media (max-width: 768px) {
    bottom: 20px;
  }
`;
