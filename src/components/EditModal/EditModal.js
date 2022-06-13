import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, SelectInput, Title } from '../../styles/GlobalStyled';
import { Wrapper, Modal } from './EditModal.styled';
import { useForm } from 'react-hook-form';
import { editAccount, getCurrentItem } from '../../redux/accountsReducer';
const EditModal = ({ setOpenModal }) => {
  // dostęp do aktualne kk elementu
  const currentItem = useSelector((state) => state.accounts.currentItem);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accountName: currentItem.accountName, // ? how to reset id
      city: currentItem.city,
      category: currentItem.category,
      status: currentItem.status,
      accountId: currentItem.accountId,
      accountUserId: currentItem.accountUserId,
    },
  });

  const onSubmit = (values) => {
    dispatch(getCurrentItem(values));
    dispatch(
      editAccount({
        accountName: values.accountName,
        city: values.city,
        category: values.category,
        status: values.status,
        accountId: values.accountId,
        accountUserId: values.accountUserId,
      })
    );
    setOpenModal(false);
    reset();
  };

  return (
    <Wrapper>
      <Modal>
        <Title center>EDIT</Title>
        <button onClick={() => setOpenModal(false)}>Close</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input {...register('accountName')} type="text" />
          </div>
          <div>
            <Input {...register('city')} type="text" />
          </div>
          <div>
            <SelectInput
              {...register('category', {
                required: 'You must choose category',
              })}
              type="text"
              placeholder="Category"
              defaultValue=""
            >
              <option value="" disabled>
                Choose category...
              </option>
              <option value="automotive">Automotive</option>
              <option value="hi-tech">Hi-tech</option>
              <option value="healthcare">Healthcare</option>
              <option value="banking">Banking</option>
            </SelectInput>
          </div>
          <div>
            <SelectInput
              {...register('status', { required: 'You must choose status' })}
              type="text"
              placeholder="Status"
              defaultValue=""
            >
              <option value="" disabled>
                Choose status...
              </option>
              <option value="strategic">Strategic</option>
              <option value="important">Important</option>
              <option value="doubt">Doubt</option>
              <option value="not_important">Not important</option>
            </SelectInput>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </Wrapper>
  );
};

export default EditModal;
