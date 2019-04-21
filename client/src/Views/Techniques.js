import React, { useContext } from 'react';
import { Store } from '../Store';
import requireAuth from '../requireAuth';
import TechniqueList from '../components/TechniqueList';
import styled from 'styled-components';

const Techniques = props => {
	const { state, dispatch } = useContext(Store);

	return (
		<Container>
			<TechniqueList />
		</Container>
	);
};

export default requireAuth(Techniques);

const Container = styled.div`
	border: ${props => props.theme.primaryDark};
	width: 80%;
	max-width: 1040px;
	min-height: 800px;
`;
