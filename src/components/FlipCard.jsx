// FlipCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 1rem;
    padding: 1rem;
    width: 100vw;
    height: 100vh;
    background: #000;
`;

const Card = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    cursor: pointer;
`;

const CardFace = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    border-radius: 8px;
    background-size: cover;
    background-position: center;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }
`;

const CardContent = styled.div`
    position: relative;
    z-index: 2;
`;

const FlipCard = ({ index, isHoverMode, isMobile, frontImage, backImage }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
  
    const flipAnimation = {
        rotateY: isFlipped ? 180 : 0,
        transition: {
            duration: 0.5,
            ease: [0.95, 0, 0.08, 1],
            onComplete: () => {
            setIsAnimating(false);
            }
        }
    };
  
    const handleInteraction = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setIsFlipped(!isFlipped);
        }
    };
  
    return (
        <Card
            animate={flipAnimation}
            onHoverStart={isHoverMode && !isMobile ? handleInteraction : undefined}
            onClick={!isHoverMode || isMobile ? handleInteraction : undefined}
            style={{ cursor: isHoverMode && !isMobile ? 'default' : 'pointer' }}
        >
            <CardFace
                style={{
                    backgroundImage: `url(${frontImage})`
                }}
            />
            <CardFace
                isBack
                style={{
                    transform: 'rotateY(180deg)',
                    backgroundImage: `url(${backImage})`
                }}
            >
                <CardContent>
                    Flip Content {index + 1}
                </CardContent>
            </CardFace>
        </Card>
    )
};
  

export default FlipCard