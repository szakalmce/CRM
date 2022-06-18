import React from 'react';
import { Table, Td, Th, Tr } from './ContactsList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { Title } from '../../styles/GlobalStyled';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getCurrentContact, removeContact } from '../../redux/accountsReducer';

const ContactsList = ({ setOpenModal }) => {
  const contacts = useSelector((state) => state.accounts.contacts);
  const accounts = useSelector((state) => state.accounts.accounts);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const location = useLocation();
  const { pathname } = location;

  const contactsList = useSelector((state) =>
    state.accounts.contacts.slice(0, 5)
  );

  // current account name

  const handleRemove = (item) => {
    dispatch(removeContact(item));
  };

  const handleCurrentItem = (item) => {
    dispatch(getCurrentContact(item));
  };

  return (
    <>
      {pathname === '/dashboard' ? (
        contactsList.length === 0 ? null : (
          <>
            <Title mb="2rem" center small>
              Last contacts added (5)
            </Title>
            <Table>
              <tbody>
                <Tr>
                  <Th>Name</Th>
                  <Th>Surname</Th>
                  <Th>Account</Th>
                  <Th>Last contact date</Th>
                  <Th>Actions</Th>
                </Tr>

                {contactsList.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <NavLink
                        onClick={() => dispatch(getCurrentContact(item))}
                        state={{ ...item }}
                        to={`/contacts/${item.name}`}
                      >
                        {item.name}{' '}
                      </NavLink>
                    </Td>
                    <Td>{item.surname}</Td>
                    <Td>
                      <NavLink
                        state={accounts.find(
                          (account) => account.accountId === item.accountId
                        )}
                        to={`/accounts/${item.accountName}`}
                      >
                        {item.accountName}
                      </NavLink>
                    </Td>
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
                              type: 'contact',
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
            <NavLink to="/contacts">Show all...</NavLink>
          </>
        )
      ) : contacts.length === 0 ? null : (
        <>
          <Title mb="2rem" center small>
            All Accounts
          </Title>
          <Table>
            <tbody>
              <Tr>
                <Th>Name</Th>
                <Th>Surname</Th>
                <Th>Account</Th>
                <Th>Last contact date</Th>
                <Th>Actions</Th>
              </Tr>

              {contacts.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <NavLink state={{ ...item }} to={`/contacts/${item.name}`}>
                      {item.name}
                    </NavLink>
                  </Td>
                  <Td>{item.surname}</Td>
                  <Td>
                    <NavLink
                      state={accounts.find(
                        (account) => account.accountId === item.accountId
                      )}
                      to={`/accounts/${item.accountName}`}
                    >
                      {item.accountName}
                    </NavLink>
                  </Td>
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
                            type: 'contact',
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

export default ContactsList;
