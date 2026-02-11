import styled from 'styled-components';
// import _default from '../../themes/default';


export const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const SocialMediaIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  min-width: 44px;
  min-height: 44px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 480px) {
    min-width: 40px;
    min-height: 40px;
    font-size: 1.35rem;
    margin: 0 0.25rem;
  }
`;