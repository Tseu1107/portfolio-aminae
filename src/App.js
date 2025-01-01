import logo from './logo.svg';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import createTheme
import './App.css';
import styled from '@emotion/styled';
import FlipCard from './components/FlipCard';
import frontImage from './components/images/man-stock.jpg';
import backImage from './components/images/woman-stock.jpg';


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
  


	const loadingAnimation = {
		initial: { opacity: 0, scale: 0.9 },
		animate: { opacity: 1, scale: 1 },
		transition: {
			duration: 0.5,
			delay: App * 0.05, // Staggered animation
		}
	};
	const images = Array(25).fill({
		front: frontImage,
		back: backImage
	  });
	  

function App() {
    return (
		<AppContainer>
			<TopBar>
				<Title>AMINA</Title>
			</TopBar>
			<GridContainer>
				{Array.from({ length: 25 }).map((_, index) => (
					<FlipCard 
					key={index} 
					index={index}
					frontImage={images[index].front}
					backImage={images[index].back}
					/>
				))}
			</GridContainer>
		</AppContainer>
    );
}

export default App;
