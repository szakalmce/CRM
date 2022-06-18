import React from 'react';
import { Input, Textarea, Title } from '../../../styles/GlobalStyled';
import { Modal, Wrapper } from '../EditModal.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addActions, addPhoneCall } from '../../../redux/accountsReducer';

const ContactActionModal = ({ setOpenActionModal, openActionModal }) => {
  const dispatch = useDispatch();

  const currentContact = useSelector((state) => state.accounts.currentContact);

  console.log(currentContact);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (values) => {
    console.log(values);
    dispatch(
      addActions({
        type: openActionModal.type,
        value: values.name,
        note: values.notes,
        date: values.date,
        id: currentContact.id,
        itemId: Math.random(),
      })
    );
    setOpenActionModal(false);
    reset();
  };

  return (
    <Wrapper>
      <Modal>
        <Title center>Add {openActionModal.type}</Title>

        <button onClick={() => setOpenActionModal(false)}>Close</button>
        {openActionModal.type === 'phone' && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('name')} type="text" />
            <Textarea {...register('notes')} type="text" />
            <Input {...register('date')} type="date" />
            <button type="submit">Add</button>
          </form>
        )}
        {openActionModal.type === 'note' && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('name')} type="text" />
            <Textarea {...register('notes')} type="text" />
            <Input {...register('date')} type="date" />
            <button type="submit">Add</button>
          </form>
        )}
        {openActionModal.type === 'email' && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('name')} type="text" />
            <Textarea {...register('notes')} type="text" />
            <Input {...register('date')} type="date" />
            <button type="submit">Add</button>
          </form>
        )}
      </Modal>
    </Wrapper>
  );
};

export default ContactActionModal;
