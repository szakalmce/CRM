import React from 'react';
import { Container, FlexWrapper } from '../../styles/GlobalStyled';

import AccountsList from '../../components/AccountsList/AccountsList';
import ContactsList from '../../components/ContactsList/ContactsList';

const Dashboard = ({ setOpenModal }) => {
  return (
    <Container marginV="5rem">
      <FlexWrapper gap="2rem" direction="column">
        <AccountsList setOpenModal={setOpenModal} />
        <ContactsList setOpenModal={setOpenModal} />
      </FlexWrapper>
    </Container>
  );
};

export default Dashboard;
