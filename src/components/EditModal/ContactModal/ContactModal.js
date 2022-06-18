import React from 'react';
import { Input, SelectInput, Title } from '../../../styles/GlobalStyled';
import { Modal } from '../EditModal.styled';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  editAccount,
  editContact,
  getCurrentContact,
} from '../../../redux/accountsReducer';

const ContactModal = ({ setOpenModal }) => {
  const currentContact = useSelector((state) => state.accounts.currentContact);

  console.log(currentContact);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentContact.name,
      surname: currentContact.surname,
      position: currentContact.position,
      phone: currentContact.phone,
      email: currentContact.email,
      accountName: currentContact.accountName,
      accountId: currentContact.accountId,
      accountUserId: currentContact.accountUserId,
      id: currentContact.id,
    },
  });

  const onSubmit = (values) => {
    dispatch(getCurrentContact(values));
    dispatch(
      editContact({
        name: values.name,
        surname: values.surname,
        position: values.position,
        phone: values.phone,
        email: values.email,
        accountId: values.accountId,
        accountUserId: values.accountUserId,
        accountName: currentContact.accountName,
      })
    );
    setOpenModal(false);
    reset();
  };

  const dispatch = useDispatch();

  return (
    <Modal>
      <Title center>EDIT</Title>
      <button onClick={() => setOpenModal(false)}>Close</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input {...register('name')} type="text" />
        </div>
        <div>
          <Input {...register('surname')} type="text" />
        </div>
        <div>
          <Input {...register('position')} type="text" />
        </div>
        <div>
          <Input {...register('phone')} type="text" />
        </div>
        <div>
          <Input {...register('email')} type="text" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default ContactModal;
