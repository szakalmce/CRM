import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, FlexWrapper } from '../../styles/GlobalStyled';
import { useSelector } from 'react-redux';

const SingleContact = ({ setOpenActionModal }) => {
  const location = useLocation();
  const contacts = useSelector((state) => state.accounts.currentContact);
  const { email, id, name, phone, position, surname, actions } = location.state;

  return (
    <Container marginV="5rem">
      <p>name: {name}</p>
      <p>surname: {surname}</p>
      <p>position: {position}</p>
      <p>phone: {phone}</p>
      <p>email: {email}</p>
      <FlexWrapper>
        <h3>ACTIONS</h3>
        <button
          onClick={() =>
            setOpenActionModal({
              value: true,
              type: 'phone',
            })
          }
        >
          Add Phone call
        </button>
        <button
          onClick={() =>
            setOpenActionModal({
              value: true,
              type: 'note',
            })
          }
        >
          Add Notes call
        </button>
        <button
          onClick={() =>
            setOpenActionModal({
              value: true,
              type: 'email',
            })
          }
        >
          Add Email message
        </button>
      </FlexWrapper>
      <hr />
      <h5>Actions</h5>
      {/* Jak to odświeżać? */}
      {actions.length > 0 && (
        <div>
          {actions.map((item) => {
            const { type, value, note, date, id } = item;
            return (
              <div key={id}>
                <p>{type}</p>
                <p>{value}</p>
                <button>Edit</button>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
};

export default SingleContact;
