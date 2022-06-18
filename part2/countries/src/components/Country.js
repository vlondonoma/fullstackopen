import React from "react";

const Country = ({country}) => 
    <>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital}</p>
    </>

export default Country