import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/shared/Button';
import villainsBackgroundImg from '../assets/villainsblackbelt.jpg';
// import CalendarView from "../assets/CalendarView.png";
// import ProgressView from "../assets/ProgressView.png";
// import WorkoutsView from "../assets/WorkoutsView.png";

const LandingPage = () => {
	const preCallToAction = 'Level up your jiu-jitsu game.';
	const callToAction = 'Track your jiu-jitsu journey with us.';

	return (
		<React.Fragment>
			<LandingContainer className="LandingContainer">
				<LandingStyle className="LandingStyle">
					<BackgroundImage className="BackgroundImage" />
					<CtaDiv className="CtaDiv">
						<CallToAction className="CallToAction">
							<Action className="Action">{preCallToAction}</Action>
							<Action className="Action">{callToAction}</Action>
							<Link to={localStorage.getItem('login_token') ? '/schedule' : '/register'}>
								<Button className="Button">START TRACKING NOW</Button>
							</Link>
							<Arrow className="Arrow" href="#middle">
								<ArrowDiv className="ArrowDiv">
									<i class="fas fa-chevron-down" />
								</ArrowDiv>
							</Arrow>
						</CallToAction>
					</CtaDiv>
				</LandingStyle>
			</LandingContainer>

			<Part2 className="Part2" id="middle">
				{/* <CalendarPic src={CalendarView} alt="A picture of the calendar view." /> */}
				<CalendarDemo className="Part2">Schedule & track your training sessions.</CalendarDemo>
			</Part2>
			<Part3 className="Part3">
				<TechniqueDemo className="Part2">
					Take notes on techniques you learned, share with friends.
				</TechniqueDemo>
				{/* <WorkoutPic src={WorkoutsView} alt="A picture of the workouts view." /> */}
			</Part3>
			<Part2 className="Part2" id="middle">
				{/* <ProgressPic src={ProgressView} alt="A picture of the progress view." /> */}
				<CalendarDemo className="CalendarDemo">Keep track of your sparring sessions.</CalendarDemo>
			</Part2>
			<Part3>
				<TechniqueDemo className="TechniqueDemo">
					See your jiu-jitsu stats and learn from your mistakes.
				</TechniqueDemo>
				{/* <WorkoutPic src={WorkoutsView} alt="A picture of the workouts view." /> */}
			</Part3>
			<Part5 className="Part5">
				<p>Copyright 2019 jiujitsio. All rights reserved.</p>
			</Part5>
		</React.Fragment>
	);
};

export default LandingPage;

const LandingStyle = styled.div`
	width: 100%;
	height: calc(100vh - 54px);
	min-height: 900px;
	color: white;
	font-family: 'Roboto', sans-serif;
	position: relative;
	background-color: transparent;
	margin: 0 auto;

	@media (max-width: 900px) {
		flex-direction: column;
		min-height: 600px;
	}
	@media (max-width: 320px) {
		min-height: 450px;
	}
`;

const ArrowDiv = styled.div`
	color: white;
	margin-top: 15%;
	i {
		font-size: 6em;
	}
`;

const Arrow = styled.a`
	color: white;
	margin-top: 15%;
	i {
		font-size: 6em;
	}
	-moz-animation: arrow 3s infinite;
	-webkit-animation: arrow 3s infinite;
	animation: arrow 3s infinite;

	@keyframes arrow {
		0%,
		10% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(15px);
		}
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		60% {
			transform: translateY(15px);
		}
	}
`;

const Action = styled.div`
	font-size: 2.8rem;
	font-weight: 500;
	margin-bottom: 20px;
	text-align: left;
	color: ${props => props.theme.accent};

	@media (max-width: 900px) {
		text-align: center;
	}
`;

const BackgroundImage = styled.span`
	width: 100%;
	height: 100%;
	/* min-height: 500px; */
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
	background: no-repeat center center fixed;
	background-image: url(${villainsBackgroundImg});
	background-size: cover;
`;

const CtaDiv = styled.div`
	display: flex;
	@media (max-width: 900px) {
		flex-direction: column;
		align-items: center;
	}
`;
const CallToAction = styled.div`
	height: 200px;
	z-index: 2;
	position: absolute;
	top: 250px;
	margin-left: 2%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	@media (max-width: 900px) {
		top: 200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		width: 100%;
	}

	@media (max-width: 420px) {
		top: 100px;
	}

	@media (max-width: 320px) {
		top: 50px;
	}
`;

const Part2 = styled.div`
	margin: 0 auto;
	width: 100%;
	height: auto;
	background-color: #f5f5f5;
	font-size: 3.3rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
	align-items: center;
	@media (max-width: 900px) {
		flex-direction: column;
		padding: 20px;
	}
	@media (max-width: 500px) {
		flex-direction: column-reverse;
	}
`;

const CalendarPic = styled.img`
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 50%;
	align-items: center;
	border-radius: 6px;
	border: 1px solid #bed3dd;
	background-color: white;
	@media (max-width: 900px) {
		width: 100%;
	}
`;

const CalendarDemo = styled.div`
	font-family: 'Roboto', sans-serif;
	font-weight: bold;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	justify-content: center;
	align-items: flex-start;
	width: 40%;
	height: 350px;
	align-items: center;
	color: #2b3a42;
	@media (max-width: 900px) {
		width: 65%;
	}
`;

const Part3 = styled.div`
	height: auto;
	width: 100%;
	background-color: white;
	font-size: 3.3rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: white;
	@media (max-width: 900px) {
		flex-direction: column;
		padding: 20px;
	}

	@media (max-width: 500px) {
		width: 100%;
		flex-direction: column;
	}
`;

const Part5 = styled.div`
	height: auto;
	width: 100%;
	background-color: white;
	font-size: 1.3rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: white;
	@media (max-width: 900px) {
		flex-direction: column;
		padding: 20px;
	}

	@media (max-width: 500px) {
		width: 100%;
		flex-direction: column;
	}
`;

const WorkoutPic = styled.img`
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 50%;
	align-items: center;
	border-radius: 6px;
	border: 1px solid #bed3dd;
	@media (max-width: 900px) {
		width: 100%;
	}
`;

const TechniqueDemo = styled.div`
	font-family: 'Roboto', sans-serif;
	font-weight: bold;
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 40%;
	height: 350px;
	color: #2b3a42;
	// border: 1px solid red;
	@media (max-width: 900px) {
		width: 65%;
	}
`;

const Part4 = styled.div`
	width: 100%;
	height: auto;
	padding: 50px;
	background-color: #f5f5f5;
	font-size: 3.3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #f5f5f5;
	@media (max-width: 900px) {
		flex-direction: column;
		padding: 20px;
	}

	@media (max-width: 500px) {
		width: 100%;
		flex-direction: column-reverse;
	}
`;

const ProgressDemo = styled.div`
	font-family: 'Roboto', sans-serif;
	font-weight: bold;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	justify-content: center;
	align-items: flex-start;
	width: 40%;
	height: 350px;
	color: #2b3a42;
	@media (max-width: 900px) {
		width: 65%;
	}
	@media (max-width: 500px) {
		margin-bottom: 20px;
	}
`;

const ProgressPic = styled.img`
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 50%;
	align-items: center;
	border-radius: 6px;
	border: 1px solid #bed3dd;
	@media (max-width: 900px) {
		width: 100%;
	}
`;

const LandingContainer = styled.div`
	width: 100%;
	/* border: solid blue; */
	max-width: 1280px;
`;
