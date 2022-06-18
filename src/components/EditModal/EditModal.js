import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Wrapper } from './EditModal.styled';
import { useForm } from 'react-hook-form';
import { editAccount, getCurrentItem } from '../../redux/accountsReducer';
import AccountModal from './AccountModal/AccountModal';
import ContactModal from './ContactModal/ContactModal';
const EditModal = ({ setOpenModal, openModal }) => {
  // dostęp do aktualne kk elementu

  return (
    <Wrapper>
      {openModal.type === 'account' ? (
        <AccountModal setOpenModal={setOpenModal} openModal={openModal} />
      ) : (
        <ContactModal setOpenModal={setOpenModal} openModal={openModal} />
      )}
    </Wrapper>
  );
};

export default EditModal;
