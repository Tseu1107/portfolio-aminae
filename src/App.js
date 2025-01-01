import { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import FlipCard from './components/FlipCard';
import frontImage from './components/images/man-stock.jpg';
import backImage from './components/images/woman-stock.jpg';
import './App.css';

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
});

const AppContainer = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: #000;
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(5, 1fr);
	gap: 1rem;
	padding: 1rem;
	width: 100vw;
	height: calc(100vh - 80px);
	margin-top: 80px;
	background: #000;
`;
const TopBar = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 80px;
	background: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
`;

const Title = styled.h1`
	color: white;
	font-size: 2.5rem;
	font-weight: bold;
	letter-spacing: 2px;
	margin: 0;
`;

const Modal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.9);
	padding: 2rem;
	border-radius: 8px;
	color: white;
	z-index: 100;
	text-align: center;
`;

const ToggleButton = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	padding: 0.5rem 1rem;
	background: #333;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	z-index: 11;
	&:hover {
		background: #444;
	}
`;


const loadingAnimation = {
	initial: { opacity: 0, scale: 0.9 },
	animate: { opacity: 1, scale: 1 },
	transition: {
		duration: 0.5,
		delay: 0.05, // Staggered animation
	}
};
const images = Array(25).fill({
	front: frontImage,
	back: backImage
});
	  
const App = () => {
	const [showModal, setShowModal] = useState(true);
	const [isHoverMode, setIsHoverMode] = useState(true);
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
	useEffect(() => {
	  const timer = setTimeout(() => {
		setShowModal(false);
	  }, 3000);
	  return () => clearTimeout(timer);
	}, []);
  
	return (
	  <AppContainer>
		{showModal && (
		  <Modal>
			{isMobile ? 
			  "Mobile screen detected, tap tiles to flip" : 
			  "Desktop screen detected, hover over tiles to flip"}
		  </Modal>
		)}

		<TopBar>
		  	<Title>AMINA</Title>
			<ToggleButton 
				onClick={() => setIsHoverMode(!isHoverMode)}
				style={{ cursor: isHoverMode ? 'pointer' : 'default' }}
			>
				{isHoverMode ? 'Switch to Click' : 'Switch to Hover'}
			</ToggleButton>
		</TopBar>
  
		<GridContainer>
			{Array.from({ length: 25 }).map((_, index) => (
				<FlipCard 
					key={index} 
					index={index}
					isHoverMode={isHoverMode}
					isMobile={isMobile}
					frontImage={images[index].front}
					backImage={images[index].back}
				/>
			))}
		</GridContainer>
	  </AppContainer>
	);
  };
  

export default App;
