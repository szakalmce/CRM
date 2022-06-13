import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Table, Td, Th, Tr } from './AccountsList.styled';
import { NavLink } from 'react-router-dom';
import { getCurrentItem, removeAccount } from '../../redux/accountsReducer';
import { Title } from '../../styles/GlobalStyled';

const AccountsList = ({ setOpenModal }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const accounts = useSelector((state) => state.accounts.accounts);
  const currentAccounts = accounts.filter(
    (item) => item.accountUserId === currentUser.userId
  );

  const dispatch = useDispatch();

  const accountsList = useSelector((state) =>
    state.accounts.accounts.slice(0, 5)
  );

  const handleRemove = (item) => {
    dispatch(removeAccount(item));
  };

  const handleCurrentItem = (item) => {
    dispatch(getCurrentItem(item));
  };

  return (
    <>
      {/* to trzebaw wyrzucić do nowego pliku (reużywalny) */}
      {accountsList.length === 0 ? null : (
        <>
          <Title mb="2rem" center small>
            Last accounts added (5)
          </Title>
          <Table>
            <tbody>
              <Tr>
                <Th>Account Name</Th>
                <Th>City</Th>
                <Th>Category</Th>
                <Th>Status</Th>

                <Th>Actions</Th>
              </Tr>

              {accountsList.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <NavLink
                      state={{ ...item }}
                      to={`/accounts/${item.accountName}`}
                    >
                      {item.accountName}{' '}
                    </NavLink>
                  </Td>
                  <Td>{item.city}</Td>
                  <Td>{item.category}</Td>
                  <Td>{item.status}</Td>
                  <Td>
                    {item.accountUserId === currentUser.userId ? (
                      <button onClick={() => handleRemove(item)}>Usuń</button>
                    ) : (
                      '-'
                    )}

                    {item.accountUserId === currentUser.userId ? (
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          handleCurrentItem(item);
                        }}
                      >
                        Edytuj
                      </button>
                    ) : null}
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <Title mb="2rem" center small>
            Last contacts added (5)
          </Title>
        </>
      )}
      ;
    </>
  );
};

export default AccountsList;
