import styled from 'styled-components';
// import _default from '../../themes/default';

export const Container = styled.div`
    background: radial-gradient(circle at 10% 20%, rgba(0, 201, 167, 0.06), transparent 35%),
      radial-gradient(circle at 90% 10%, rgba(132, 94, 194, 0.08), transparent 35%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    padding: 40px 20px 110px;
    gap: 16px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

export const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 700;
letter-spacing: 0.2px;
margin-top: 10px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 8px;
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

export const ToggleButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    border: 1px solid ${({ theme }) => theme.text_secondary + "33"};
    color: ${({ theme }) => theme.text_primary};
    font-size: 14px;
    border-radius: 999px;
    font-weight: 600;
    margin: 22px 0 10px;
    padding: 6px;
    background: ${({ theme }) => theme.card};
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    @media (max-width: 768px) {
        font-size: 12px;
    }
    @media (max-width: 480px) {
        font-size: 12px;
    }
`

export const ToggleButton = styled.div`
    padding: 8px 16px;
    min-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
    ${({ active, theme }) =>
        active && `
    background: ${theme.primary};
    color: ${theme.white};
    `
    }
    &:hover {
        background: ${({ theme }) => theme.primary + "22"};
    }
    @media (max-width: 768px) {
        padding: 8px 12px;
        min-height: 34px;
    }
    @media (max-width: 480px) {
        padding: 8px 10px;
        font-size: 11px;
    }
`
export const Divider = styled.div`
    display: none;
`


export const CarouselContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 10px;
    
    /* Slick carousel customization */
    .slick-dots {
        bottom: -50px;
        
        li button:before {
            color: ${({ theme }) => theme.text_secondary};
            font-size: 10px;
        }
        
        li.slick-active button:before {
            color: ${({ theme }) => theme.primary};
        }
    }
    
    .slick-prev, .slick-next {
        z-index: 2;
        width: 36px;
        height: 36px;
        
        &:before {
            font-size: 22px;
            color: ${({ theme }) => theme.primary};
        }
    }
    
    .slick-prev {
        left: -36px;
    }
    
    .slick-next {
        right: -36px;
    }
    
    .slick-slide {
        padding: 0 15px;
        
        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    }
    
    /* Mobile responsiveness */
    @media (max-width: 1200px) {
        .slick-prev {
            left: -12px;
        }
        
        .slick-next {
            right: -12px;
        }
    }
    
    @media (max-width: 768px) {
        padding: 0 10px;
        
        .slick-prev, .slick-next {
            display: none !important;
        }
        
        .slick-slide {
            padding: 0 8px;
        }
        
        .slick-dots {
            bottom: -40px;
            
            li button:before {
                font-size: 12px;
            }
        }
    }
    
    @media (max-width: 640px) {
        padding: 0 5px;
        
        .slick-slide {
            padding: 0 5px;
        }
    }
`;
