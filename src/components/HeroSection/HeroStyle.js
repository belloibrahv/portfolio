import styled from "styled-components";

export const HeroContainer = styled.div`
  background:
    radial-gradient(circle at 15% 20%, rgba(45, 212, 191, 0.12), transparent 28%),
    radial-gradient(circle at 85% 10%, rgba(56, 189, 248, 0.10), transparent 26%),
    linear-gradient(180deg, ${({ theme }) => theme.card_light} 0%, ${({ theme }) => theme.bg} 100%);
  display: flex;
  justify-content: center;
  position: relative;
  padding: 96px 24px 120px;
  @media (max-width: 960px) {
    padding: 80px 16px 100px;
  }
  @media (max-width: 640px) {
    padding: 64px 16px 84px;
  }
  z-index: 1;
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
  gap: 28px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 24px;
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
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 8px;
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
  margin-top: -20px;
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
    margin-bottom: 18px;
    margin-top: 0;
  }

  @media (max-width: 640px) {
    margin-bottom: 8px;
    margin-top: 0;
  }
`;

export const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  padding: 18px;
  border-radius: 32px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
    ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + "22"};
  box-shadow:
    0 30px 80px rgba(2, 8, 23, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 12px;
    border-radius: 26px;
  }
`;

export const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "14"};
  box-shadow:
    0 16px 42px rgba(0, 0, 0, 0.18),
    0 0 0 1px rgba(45, 212, 191, 0.08);
  object-fit: cover;
  object-position: 50% 20%;
  background: ${({ theme }) => theme.card_light};
  aspect-ratio: 1 / 1;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  @media (max-width: 640px) {
    max-width: 100%;
  }

  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow:
      0 24px 60px rgba(0, 0, 0, 0.24),
      0 0 0 1px rgba(45, 212, 191, 0.18);
  }
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.05;
  max-width: 520px;
  white-space: normal;
  word-break: break-word;
  @media (max-width: 960px) {
    text-align: center;
    font-size: 38px;
    max-width: 90vw;
  }
  @media (max-width: 640px) {
    font-size: 31px;
    line-height: 1.1;
    margin-bottom: 10px;
    max-width: 98vw;
  }
`;

export const Eyebrow = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 14px;
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
  font-size: 19px;
  line-height: 32px;
  margin: 16px 0 18px;
  color: ${({ theme }) => theme.text_primary};
  max-width: 620px;
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
  line-height: 30px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 8px 0 20px;
  max-width: 640px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

export const HeroStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  margin: 22px 0 24px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    margin: 18px 0 20px;
  }
`;

export const StatCard = styled.div`
  padding: 14px 16px;
  border-radius: 18px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + "20"};
  box-shadow: 0 14px 28px rgba(2, 8, 23, 0.16);
  backdrop-filter: blur(8px);
  min-height: 88px;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 8px;
`;

export const StatValue = styled.div`
  font-size: 17px;
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.text_primary};
`;

export const ToolStack = styled.div`
  width: 100%;
  margin: 0 0 22px;
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
  border: 1px solid ${({ theme }) => theme.text_secondary + "22"};
  border-radius: 999px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(45, 212, 191, 0.12);
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
    135deg,
    #2DD4BF 0%,
    #38BDF8 100%
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

export const SoftButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  width: 100%;
  max-width: 300px;
  min-height: 48px;
  padding: 14px 24px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "2b"};
  background: rgba(255, 255, 255, 0.02);
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(45, 212, 191, 0.42);
    transform: translateY(-2px);
    background: rgba(45, 212, 191, 0.08);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 20px;
    min-height: 44px;
  }
`;

export const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const TrustChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(45, 212, 191, 0.08);
  border: 1px solid rgba(45, 212, 191, 0.14);
  color: ${({ theme }) => theme.text_primary};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

export const FloatingCard = styled.div`
  position: absolute;
  right: ${({ right }) => right || 'auto'};
  left: ${({ left }) => left || 'auto'};
  top: ${({ top }) => top || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  min-width: 180px;
  max-width: 220px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 22px 40px rgba(2, 8, 23, 0.28);
  backdrop-filter: blur(12px);
  color: ${({ theme }) => theme.white};
`;

export const FloatingCardLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: rgba(248, 250, 252, 0.7);
  margin-bottom: 6px;
`;

export const FloatingCardValue = styled.div`
  font-size: 14px;
  line-height: 1.45;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 28px;
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
