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

// Import firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../auth/firebase';

// Import useForm
import { useForm } from 'react-hook-form';

const Register = () => {
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

    await createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err.message);
      });

    reset();
  };

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
              <Button type="submit">Submit</Button>
            </Form>
          </FormWrapper>
        </RegisterWrapper>
      </Container>
    </Wrapper>
  );
};

export default Register;
