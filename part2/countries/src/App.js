import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [newFilter])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const regFilter = new RegExp(newFilter, 'i')

  const handleShowCountry = (event) => {
    event.preventDefault();
    setNewFilter(event.target.value)
  }

  return (
    <div>
        <h1>Countries</h1>
        <Filter handleFilter={handleFilter} newFilter={newFilter}/>
        <h2>Result</h2>
        <Countries countries={
            newFilter? 
                countries.filter(country => regFilter.test(country.name.common))
                : countries}
            handleShowCountry={handleShowCountry}/>
    </div>
  )
}

export default App