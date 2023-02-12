import { useEffect, useState } from 'react';
import Persons from './components/Persons';
import Notification from './components/Notification';
import Filter from './components/Filter';
import Form from './components/Form';
import phonebookService from './services/data';
import './index.css';

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  // ]);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [notification, setNotification] = useState({
    state: false,
    msg: '',
    type: '',
  });

  // useEffect(() => {
  //   console.log('effect');
  //   axios.get('http://localhost:3001/persons').then((response) => {
  //     console.log('promise fulfilled');
  //     setPersons(response.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('http://localhost:3001/persons');
  //       if (!res.ok) {
  //         throw new Error(res.statusText);
  //       }
  //       const json = await res.json();
  //       setPersons(json);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => console.log(err));
  }, []);

  // helper function to display notification with default values: status= false, msg='', type=''
  const notificationStatus = (status = false, msg = '', type = '') => {
    setNotification({ status, msg, type });
  };

  // handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    // create new contact object
    const newContactObject = {
      name: newName,
      number: newNum,
      // id: persons.length + 1,
    };
    // check if the name in the new contact already exists
    const foundPerson = persons.find(
      (person) => person.name === newContactObject.name
    );
    if (foundPerson) {
      const alertMsg = `${newName} already exists. Do you want to replace their number with a new one?`;
      if (window.confirm(alertMsg)) {
        phonebookService
          .update(foundPerson.id, newContactObject)
          .then((updatedContact) => {
            const newPersons = persons.map((person) =>
              person.id === updatedContact.id ? updatedContact : person
            );
            setPersons(newPersons);
            setNewName('');
            setNewNum('');
          })
          .catch((error) => {
            // setNotificationMsg(
            //   `Information of ${foundPerson.name} has already been removed from server.`
            // );
            notificationStatus(
              true,
              `Information of ${foundPerson.name} has already been removed from server.`,
              'unsuccessful'
            );
          });
      }
    } else {
      phonebookService.create(newContactObject).then((returnedNewObject) => {
        console.log(returnedNewObject);
        setPersons([...persons, returnedNewObject]);
        notificationStatus(
          'true',
          `${returnedNewObject.name} has been added`,
          'successful'
        );
        // remove notification after 3 seconds
        setTimeout(() => {
          notificationStatus();
        }, 3000);
        setNewName('');
        setNewNum('');
      });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const handleFilter = (e) => {
    const nameInput = e.target.value;
    setFilteredName(nameInput);
  };

  const handleDelete = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);
    const alertMsg = `Delete ${deletedPerson.name}?`;
    if (window.confirm(alertMsg)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          notificationStatus(
            true,
            `${deletedPerson.name} has been deleted`,
            'successful'
          );
          setTimeout(() => {
            notificationStatus();
          }, 3000);
        })
        .catch((err) => err.statusText);
    }
  };

  const formInfo = {
    handleNameChange,
    handleNumChange,
    handleSubmit,
    newName,
    newNum,
  };

  // when filteredName = '' -> person.name.toLocaleLowerCase().includes(filteredName.trim().toLocaleLowerCase()) always returns true because a string always includes an empty string.
  // AN EMPTY STRING IS ALWAYS A SUBSTRING OF A STRING
  const filteredPersons = persons.filter((person) =>
    person.name
      .toLocaleLowerCase()
      .includes(filteredName.trim().toLocaleLowerCase())
  );

  console.log(filteredPersons);

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.status && <Notification notification={notification} />}
      <Filter filteredName={filteredName} handleFilter={handleFilter} />
      <h2>add a new contact</h2>
      <Form formInfo={formInfo} />
      <div>
        debug: {newName} {newNum}
      </div>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
