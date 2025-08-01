import styled from 'styled-components';
// import _default from '../../themes/default';

export const Container = styled.div`
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
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

export const ToggleButtonGroup = styled.div`
    display: flex;
    border: 1.5px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    font-size: 16px;
    border-radius: 12px;
    font-weight: 500;
    margin: 22px 0px;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`

export const ToggleButton = styled.div`
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
    ${({ active, theme }) =>
        active && `
    background: ${theme.primary + 20};
    `
    }
    &:hover {
        background: ${({ theme }) => theme.primary + 8};
    }
    @media (max-width: 768px) {
        padding: 6px 8px;
        border-radius: 4px;
    }
`
export const Divider = styled.div`
    width: 1.5px;
    background: ${({ theme }) => theme.primary};
`


export const CarouselContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    
    /* Slick carousel customization */
    .slick-dots {
        bottom: -50px;
        
        li button:before {
            color: ${({ theme }) => theme.primary};
            font-size: 14px;
        }
        
        li.slick-active button:before {
            color: ${({ theme }) => theme.primary};
        }
    }
    
    .slick-prev, .slick-next {
        z-index: 2;
        width: 40px;
        height: 40px;
        
        &:before {
            font-size: 24px;
            color: ${({ theme }) => theme.primary};
        }
    }
    
    .slick-prev {
        left: -50px;
    }
    
    .slick-next {
        right: -50px;
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
            left: -25px;
        }
        
        .slick-next {
            right: -25px;
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
