import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  FlexWrapper,
  FormErrorMessage,
  Input,
} from '../../styles/GlobalStyled';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addNewContact } from '../../redux/accountsReducer';

const SingleAccount = () => {
  const location = useLocation();
  const { accountName, city, category, status, accountUserId, accountId } =
    location.state;

  console.log(location.state);

  const [addContactForm, setAddContactForm] = useState(false);
  const [isAccountOwner, setIsAccountOwner] = useState(false);

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.accounts.contacts);
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);

  const currentIdContacts = contacts.filter(
    (contact) => contact.accountId === accountId
  );

  // jeśli zalogowany doda nowy kontakt is editable true / ale jesli się wyloguje
  // i pojawi się nowy już nie
  useEffect(() => {
    const test = users.find((user) => user.userId === accountUserId);

    if (test.userId === currentUser.userId) {
      setIsAccountOwner(true);
    } else {
      setIsAccountOwner(false);
    }
  }, []);

  const accountOwner = users
    .find((user) => user.userId === accountUserId)
    .userName.split('@')[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      position: '',
      phone: '',
      email: '',
      accountId: '',
      id: '',
      accountName: '',
      actions: [],
    },
  });

  const onSubmit = (values) => {
    dispatch(
      addNewContact({
        name: values.name.toLowerCase(),
        surname: values.surname,
        position: values.position,
        phone: values.phone,
        email: values.email,
        accountUserId: accountUserId,
        accountId: accountId,
        id: Math.random(),
        accountName: accountName,
        actions: [],
      })
    );

    reset();
    setAddContactForm(false);
  };

  return (
    <Container marginV="5rem">
      <p>Name: {accountName}</p>
      <p>City: {city}</p>
      <p>Category: {category}</p>
      <p>Staus: {status}</p>
      <p>Owner: {accountOwner}</p>
      <p>Contacts:</p>
      <ul>
        {currentIdContacts.map((contact) => (
          <div key={contact.id}>
            <p>{contact.name}</p> {/* Duża pierwsza litera css or js */}
          </div>
        ))}
      </ul>
      {isAccountOwner ? (
        <>
          <button onClick={() => setAddContactForm(!addContactForm)}>
            {addContactForm ? 'Hide' : 'Add new contact'}
          </button>
          {addContactForm ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <FlexWrapper direction="column" gap="1rem">
                <div>
                  <label>Name:</label>
                  <Input
                    {...register('name', {
                      required: 'Add Contact Name',
                      minLength: {
                        value: 4,
                        message: 'You have to add more then 4 characters',
                      },
                    })}
                    width="40%"
                    type="text"
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </div>
                <div>
                  <label>Surname:</label>
                  <Input
                    {...register('surname', {
                      required: 'Add Surname',
                      minLength: {
                        value: 4,
                        message: 'You have to add more then 4 characters',
                      },
                    })}
                    width="40%"
                    type="text"
                  />
                </div>
                <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
                <div>
                  <label>Position:</label>
                  <Input
                    {...register('position', {
                      required: 'Add position',
                    })}
                    width="40%"
                    type="text"
                  />
                  <FormErrorMessage>
                    {errors.position?.message}
                  </FormErrorMessage>
                </div>

                <div>
                  <label>Phone:</label>
                  <Input
                    {...register('phone', {
                      required: 'Add Phone Number',
                      minLength: {
                        value: 9,
                        message: 'You have to add 9 characters',
                      },
                    })}
                    width="40%"
                    type="number"
                  />
                  <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </div>
                <div>
                  <label>Email:</label>
                  <Input
                    {...register('email', {
                      required: 'Add your email addres',
                      minLength: {
                        value: 4,
                        message: 'You have to add more then 4 characters',
                      },
                    })}
                    width="40%"
                    type="email"
                  />
                </div>
                <button type="submit">Add</button>
              </FlexWrapper>
            </form>
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

export default SingleAccount;
