import { PropTypes } from 'prop-types';
import {  useState } from 'react';

import { Input, Form, Button } from './ContactForm.module';

const shortid = require('shortid');
const inputNameId = shortid.generate();
const inputNumberId = shortid.generate();
const buttonId = shortid.generate();

export default function ContactForm({ onSubmitForm }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handelInputChange(event) {
    switch (event.currentTarget.name) {
      case 'name':
        setName(event.currentTarget.value);
        break;
      case 'number':
        setNumber(event.currentTarget.value);
        break;
      default:
        return;
    }
  }

  function reset() {
    setName('');
    setNumber('');
  }

  function handelSubmit(event) {
    event.preventDefault();

    onSubmitForm(name, number);

    reset();
  }

  return (
    <Form onSubmit={handelSubmit}>
      <label htmlFor={inputNameId}>
        <span>Name</span>
      </label>
      <Input
        autoComplete="off"
        type="text"
        name="name"
        id={inputNameId}
        value={name}
        onChange={handelInputChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label htmlFor={inputNumberId}>
        <span>Number</span>
      </label>
      <Input
        type="tel"
        name="number"
        id={inputNumberId}
        value={number}
        onChange={handelInputChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <label htmlFor={buttonId}>
        <Button type="submit" id={buttonId}>
          Add contact
        </Button>
      </label>
    </Form>
  );
}


ContactForm.propType = {
  name: PropTypes.string,
  number: PropTypes.string,
  handelSubmit: PropTypes.func,
  inputNameId: PropTypes.string,
  inputNumberId: PropTypes.string,
  buttonId: PropTypes.string,
};
