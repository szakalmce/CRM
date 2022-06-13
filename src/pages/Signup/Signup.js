import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Title,
  FlexWrapper,
  Input,
  FormErrorMessage,
} from '../../styles/GlobalStyled';
import { Wrapper, RegisterWrapper, FormWrapper, Form } from './Signup.styled';
import { useNavigate } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { loggedUser, userStatus } from '../../redux/userReducer';

// Import firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../auth/firebase';

// Import useForm
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNewAccount } from '../../redux/accountsReducer';

const SignUp = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mail: '',
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = async (values) => {
    const { mail, password } = values;

    await signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch(
          loggedUser({
            userName: user.email,
            userId: user.uid,
            isVerified: user.emailVerified,
            isLogged: true,
          })
        );
        dispatch(userStatus(true));
        toast.success(`Your are logged in as ${user.email}`);
        naviagate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });

    reset();
  };

  return (
    <Wrapper>
      <Container>
        <RegisterWrapper>
          <Title center>Signup</Title>
          <FormWrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FlexWrapper>
                <Input
                  type="email"
                  {...register('mail', { required: 'This filed is required' })}
                  placeholder="E-mail*"
                />
                <FormErrorMessage>{errors.mail?.message}</FormErrorMessage>
              </FlexWrapper>
              <FlexWrapper>
                <Input
                  type="password"
                  {...register('password', {
                    required: 'This filed is required',
                    minLength: {
                      value: 4,
                      message: 'min 4 characters',
                    },
                  })}
                  placeholder="Password*"
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FlexWrapper>

              <Button width="50%" type="submit">
                Submit
              </Button>
            </Form>
          </FormWrapper>
        </RegisterWrapper>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
