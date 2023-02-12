import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [newFilter])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addPhone = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName) &&
        window.confirm(`${newName} is already added to phonebook.Replace the old number with a new one?`)){
        updatePhone()
    }else{        
        const personObject = {
            name: newName,
            number: newPhone
        }
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewPhone("")
                showMessage('success',personObject.name+" was successfully created")
            })
            .catch(error => {
                let message = "There was an error";
                if (error.response) {
                    message = error.response.data.error;
                }
                showMessage('error', message);
            })
    }
  }

  const updatePhone = () => {
    const person = persons.find(p => p.name === newName)
    if(person){
        const changedPerson = { ...person, number: newPhone }
        personService
            .update(person.id,changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.name !== newName? person:returnedPerson))
                setNewName("")
                setNewPhone("")
                showMessage('success',person.name+" was successfully updated")
            })
            .catch(error => {
                let message = "There was an error";
                if (error.response) {
                    message = error.response.data.error;
                }
                showMessage('error', message);
            })
    }
  }

  const showMessage = (type, message) => {
    setMessage({'type':type,'text':message})
    setTimeout(() => {
        setMessage(null)
      }, 5000)
  }
  
  const regFilter = new RegExp(newFilter, 'i')

  const handleDelete = event => {
    event.preventDefault()
    const id= event.target.value
    const person = persons.find(person => person.id === id)
    if(window.confirm("Delete "+person.name)){    
        personService
        .remove(id)
        .then(emptyData => {
            setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
            let message = "There was an error";
            if (error.response) {
                message = error.response.data.error;
            }
            showMessage('error', message);
        })
    }
  }

  return (
    <div>
        <h1>Phonebook</h1>
        <Notification message={message}/>
        <Filter handleFilter={handleFilter} newFilter={newFilter}/>
        <h2>Add a new person</h2>
        <PersonForm 
            newName={newName} 
            handleNameChange={handleNameChange} 
            newPhone={newPhone} 
            handlePhoneChange={handlePhoneChange}
            addPhone={addPhone}/>
        <h2>Numbers</h2>
        <Persons handleDelete={handleDelete} persons={
            newFilter? 
                persons.filter(person => regFilter.test(person.name))
                : persons}/>
    </div>
  )
}

export default App