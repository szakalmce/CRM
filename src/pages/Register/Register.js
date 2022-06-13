import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Title,
  FlexWrapper,
  Input,
  FormErrorMessage,
} from '../../styles/GlobalStyled';
import { Wrapper, RegisterWrapper, FormWrapper, Form } from './Register.styled';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { addRegisteredUser } from '../../redux/userReducer';

// Import firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../auth/firebase';

// Import useForm
import { useForm } from 'react-hook-form';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const { mail, password, password_confirmation } = values;

    if (password !== password_confirmation) {
      toast.error('Passwords must be the same! Try once again');
      return;
    }

    await createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          addRegisteredUser({
            userName: user.email,
            userId: user.uid,
            isVerified: user.emailVerified,
          })
        );
        toast.success('You are register! Now you can login!');
        setTimeout(() => {
          navigate('/signup');
        }, 1500);
      })
      .catch((err) => {
        console.log(err.message);
      });

    reset();
  };

  const prices = [20, 11, 10, 100, 21];

  const newPrices = [...prices];

  console.log(Math.min(...prices));

  return (
    <Wrapper>
      <Container>
        <RegisterWrapper>
          <Title center>Register</Title>
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

              <FlexWrapper>
                <Input
                  type="password"
                  {...register('password_confirmation', {
                    required: 'This filed is required',
                    minLength: {
                      value: 4,
                      message: 'min 4 characters',
                    },
                  })}
                  placeholder="Confirm password*"
                />
                <FormErrorMessage>
                  {errors.password_confirmation?.message}
                </FormErrorMessage>
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

export default Register;
