import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accounts: localStorage.getItem('accounts')
    ? JSON.parse(localStorage.getItem('accounts'))
    : [],
  contacts: localStorage.getItem('contacts')
    ? JSON.parse(localStorage.getItem('contacts'))
    : [],
  currentItem: [],
  editItem: [],
};

const accountsReducer = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addNewAccount: (state, action) => {
      state.accounts.push(action.payload);

      const unique = [];
      const uniqueObj = new Set();

      for (const obj of state.accounts) {
        const objectJSON = action.payload.accountName;
        if (!uniqueObj.has(objectJSON)) {
          unique.push(obj);
        } else {
          alert('Taka nazwa klient już istnieje');
        }
        uniqueObj.add(obj.accountName);
      }

      state.accounts = unique;

      window.localStorage.setItem('accounts', JSON.stringify(state.accounts));
    },
    removeAccount: (state, action) => {
      const newAccounts = state.accounts.filter(
        (account) => account.accountId !== action.payload.accountId
      );

      // Jeśli usuwam klienta powinienem usunąć jeszcze kontakty od klienta
      const removeContacts = state.contacts.filter(
        (contact) => contact.accountId !== action.payload.accountId
      );

      state.accounts = newAccounts;
      state.contacts = removeContacts;

      window.localStorage.setItem('accounts', JSON.stringify(state.accounts));
      window.localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    getCurrentItem: (state, action) => {
      state.currentItem = action.payload;

      // źle skonstuowane (powinno być w osobnym elemencie)
    },
    editAccount: (state, action) => {
      const findItem = state.accounts.findIndex(
        (item) => item.accountId === action.payload.accountId
      );

      state.accounts[findItem] = action.payload;
      state.currentItem = action.payload;

      window.localStorage.setItem('accounts', JSON.stringify(state.accounts));
    },
    // Contacts
    addNewContact: (state, action) => {
      state.contacts.push(action.payload);

      const unique = [];
      const uniqueObj = new Set();

      for (const obj of state.contacts) {
        const objectJSON = action.payload.name;
        if (!uniqueObj.has(objectJSON)) {
          unique.push(obj);
        } else {
          alert('Taka nazwa kontaktu już istnieje');
        }
        uniqueObj.add(obj.name);
      }

      state.contacts = unique;

      window.localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
  },
});

export const {
  addNewAccount,
  addNewContact,
  removeAccount,
  editAccount,
  getCurrentItem,
} = accountsReducer.actions;

export default accountsReducer.reducer;
