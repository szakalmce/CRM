import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAccount } from '../../redux/accountsReducer';
import {
  Button,
  Container,
  FormErrorMessage,
  Input,
  SelectInput,
  Textarea,
  Title,
} from '../../styles/GlobalStyled';
import { GridItem, Wrapper } from './AddNewAccounts.styled';

const AddNewAccount = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser.userId);

  const [status, setStatus] = useState(false);
  const [category, setCategory] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accountName: '',
      city: '',
      category: '',
      status: '',
      accountId: '',
      accountUserId: '',
    },
  });

  const onSubmit = (values) => {
    if (values.category == 1) {
      setCategory(true);
    } else {
      setCategory(false);
    }
    if (values.status == 1) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    if (values.category == 1 || values.status == 1) {
      return;
    } else {
      dispatch(
        addNewAccount({
          accountName: values.accountName.toLowerCase(),
          accountUserId: currentUser,
          city: values.city,
          category: values.category,
          status: values.status,
          description: values.description,
          accountId: Math.random(),
          isEdit: false,
        })
      );
      reset();
    }
  };

  return (
    <Container marginV="5rem">
      <Title mb="2rem" center>
        NEW ACCOUNT FORM
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <GridItem column_start="1" column_end="3">
            <Input
              {...register('accountName', {
                required: 'This filed is required',
                minLength: {
                  value: 4,
                  message: 'More then 10 characters',
                },
              })}
              type="text"
              placeholder="Account name"
            />
            <FormErrorMessage>{errors.accountName?.message}</FormErrorMessage>
          </GridItem>
          <GridItem>
            <Input
              {...register('city', { required: 'This filed is required' })}
              type="text"
              placeholder="City"
            />
            <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
          </GridItem>

          <GridItem>
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
            <FormErrorMessage>
              {errors.category ? errors.category.message : null}
            </FormErrorMessage>
          </GridItem>
          <GridItem>
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
            <FormErrorMessage>
              {errors.status ? <span>{errors.status.message}</span> : null}
            </FormErrorMessage>
          </GridItem>
          <GridItem row_start="2" column_start="2" row_end="4">
            <Textarea
              rows="6"
              {...register('description', {
                required: 'This filed is required',
                minLength: {
                  value: 10,
                  message: 'More then 10 characters',
                },
              })}
              type="text"
              placeholder="Description"
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </GridItem>
          <GridItem>
            <Button type="submit">Add</Button>
          </GridItem>
        </Wrapper>
      </form>
    </Container>
  );
};

export default AddNewAccount;
