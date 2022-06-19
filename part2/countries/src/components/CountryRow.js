import React from "react";

const CountryRow = ({country,handleShowCountry}) => 
    <>
    <p key={country.ccn3}>{country.name.common} <button value={country.name.common} onClick={handleShowCountry}>Show</button></p>    
    </>

export default CountryRow 