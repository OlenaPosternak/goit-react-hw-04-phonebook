import { useState, useEffect } from 'react';
import { AppStyled } from './App.module';
import ContactForm from './ContactForm/ContactForm ';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { PropTypes } from 'prop-types';

const shortid = require('shortid');
const contactId = shortid.generate();

const savedContacts = JSON.parse(localStorage.getItem(`myContacts`));

export default function App() {
  const [contacts, setContacts] = useState(savedContacts);
  const [filter, setFilter] = useState(``);

  useEffect(() => {
    localStorage.setItem(`myContacts`, JSON.stringify(contacts));
  }, [contacts]);

  function onSubmitHendler(name, number) {
    const contact = {
      id: contactId,
      name: name,
      number: number,
    };

    const contactName = [];

    for (const contact of contacts) {
      contactName.push(contact.name);
    }

    if (contactName.includes(contact.name)) {
      alert(`${contact.name} is already in contacts list`);
      return;
    }

    setContacts(prevState => [...prevState, contact]);
  }

  function filterName(event) {
    console.log(event.currentTarget.value);
    setFilter(event.currentTarget.value);
  }

  function deleteContact(contactId) {
    console.log(contactId);

    setContacts(prevState =>
      prevState.filter(contact => contactId !== contact.id)
    );
  }

  const filterNormilized = filter.toLowerCase().trim();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterNormilized)
  );

  return (
    <AppStyled>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={onSubmitHendler} />
      <Filter value={filter} onChengeFilter={filterName} />
      <ContactsList contacts={visibleContacts} deleteContact={deleteContact} />
    </AppStyled>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  onSubmitHendler: PropTypes.func,
  deleteContact: PropTypes.func,
  filterName: PropTypes.func,
};
