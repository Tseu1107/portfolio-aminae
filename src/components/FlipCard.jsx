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
  background-image: ${props => props.bgImage ? 
    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.bgImage})` : 
    'none'};
  background-size: cover;
  background-position: center;
`;




const FlipCard = ({ index, frontImage, backImage }) => {


    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
  
    const flipAnimation = {
      rotateY: isFlipped ? 180 : 0,
      transition: {
        duration: 0.5,
        ease: [0.95, 0, 0.08, 1], // Aggressive cubic bezier curve
        onComplete: () => {
          setIsAnimating(false);
        }
      }
    };

    const handleHoverStart = () => {
        if (!isAnimating) {
        setIsAnimating(true);
        setIsFlipped(true);
        }
    };

    return (
        <Card
        animate={flipAnimation}
        onHoverStart={handleHoverStart}
        >
            <CardFace
                style={{
                backgroundImage: `url(${frontImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                }}
            >
                AMINA {index + 1}
            </CardFace>
            <CardFace
                isBack
                style={{
                transform: 'rotateY(180deg)',
                backgroundImage: `url(${backImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                }}
            >
                Flip Content {index + 1}
            </CardFace>
        </Card>
    );
    
};

export default FlipCard