import React, { useContext, useEffect } from 'react';
import { Store } from '../Store';
import styled from 'styled-components';

const TechniqueList = () => {
	//Accesses state and dispatch with the useContext Hook.
	const { state, dispatch } = useContext(Store);

	return (
		<HeaderContainer>
			<p>
				Welcome to jiujitsio {state.name}! Thanks for checking it out! Come back soon to see new features!
				You'll be able to schedule and track mat time, techniques & sparring stats. See you next week!
			</p>
		</HeaderContainer>
	);
};

export default TechniqueList;

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	height: auto;
	@media (max-width: 670px) {
	}
`;
