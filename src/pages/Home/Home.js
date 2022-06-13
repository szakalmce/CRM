import React from 'react';
import { Container, Title } from '../../styles/GlobalStyled';

const Home = ({ user }) => {
  return (
    <Container marginV="5rem">
      {user ? (
        <Title center>{`You are logged in`}</Title>
      ) : (
        <Title center>You are not logged in</Title>
      )}
    </Container>
  );
};

export default Home;
