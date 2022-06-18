import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../auth/firebase';
import { signOut } from 'firebase/auth';
import { loggoutUser, userStatus } from '../../redux/userReducer';

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const accounts = useSelector((state) => state.accounts.accounts);
  const contacts = useSelector((state) => state.accounts.contacts);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(
          loggoutUser({
            userName: '',
            userId: '',
            isVerified: '',
            isLogged: false,
          })
        );
        dispatch(userStatus(false));
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const currentUserAccounts = accounts.filter(
    (account) => account.accountUserId === user.userId
  );
  const currentUserContacts = contacts.filter(
    (contact) => contact.accountUserId === user.userId
  );

  return (
    <div>
      <p>User name: {user.userName.split('@')[0]}</p>
      <p>User e-mail: {user.userName}</p>
      <p>Account added: {currentUserAccounts.length}</p>
      <p>Contact added: {currentUserContacts.length}</p>
      <p>Phone called: 0</p>
      <p>Email sent: 0</p>
      <NavLink onClick={() => handleLogout()} to="/">
        Logout
      </NavLink>
    </div>
  );
};

export default Profile;
