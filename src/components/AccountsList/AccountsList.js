import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Td, Th, Tr } from './AccountsList.styled';
import { NavLink } from 'react-router-dom';
import { getCurrentItem, removeAccount } from '../../redux/accountsReducer';
import { Title } from '../../styles/GlobalStyled';

const AccountsList = ({ setOpenModal }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const accounts = useSelector((state) => state.accounts.accounts);
  const location = useLocation();
  const dispatch = useDispatch();

  const { pathname } = location;

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
      {pathname === '/dashboard' ? (
        accountsList.length === 0 ? null : (
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
                            setOpenModal({
                              value: true,
                              type: 'account',
                            });
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
            <NavLink to="/accounts">Show all...</NavLink>
          </>
        )
      ) : accounts.length === 0 ? null : (
        <>
          <Title mb="2rem" center small>
            All Accounts
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

              {accounts.map((item, index) => (
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
                          setOpenModal({
                            value: true,
                            type: 'account',
                          });
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
        </>
      )}
    </>
  );
};

export default AccountsList;
