import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)){
        alert(`${newName} is already added to phonebook`)
    }else{
        const personObject = {
            name: newName,
            number: newPhone
        }    
        setPersons(persons.concat(personObject))
        setNewName("")
        setNewPhone("")
    }    
  }

  const regFilter = new RegExp(newFilter, 'i')

  return (
    <div>
        <h1>Phonebook</h1>
        <Filter handleFilter={handleFilter} newFilter={newFilter}/>
        <h2>Add a new person</h2>
        <PersonForm 
            newName={newName} 
            handleNameChange={handleNameChange} 
            newPhone={newPhone} 
            handlePhoneChange={handlePhoneChange}
            addName={addName}/>
        <h2>Numbers</h2>
        <Persons persons={
            newFilter? 
                persons.filter(person => regFilter.test(person.name))
                : persons}/>
    </div>
  )
}

export default App