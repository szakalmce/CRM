import React from 'react';
import { Container, FlexWrapper } from '../../styles/GlobalStyled';

import AccountsList from '../../components/AccountsList/AccountsList';

const Dashboard = ({ setOpenModal }) => {
  return (
    <Container marginV="5rem">
      <FlexWrapper direction="column">
        <AccountsList setOpenModal={setOpenModal} />
      </FlexWrapper>
    </Container>
  );
};

export default Dashboard;
