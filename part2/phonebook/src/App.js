import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
            addPhone={addPhone}/>
        <h2>Numbers</h2>
        <Persons persons={
            newFilter? 
                persons.filter(person => regFilter.test(person.name))
                : persons}/>
    </div>
  )
}

export default App