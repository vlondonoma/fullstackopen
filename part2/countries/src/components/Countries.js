import React from "react";
import CountryDetails from "./CountryDetails";
import CountryRow from "./CountryRow";

const Countries = ({countries,handleShowCountry}) => {
    if(countries.length===0){
        return <p>None results</p>
    }else if(countries.length===1){
        return <CountryDetails country={countries[0]}/>
    }else if( countries.length>10){
        return <p>Too many matches, specify another filter</p>;
    }else{
        return countries.map(
            country => <CountryRow country={country} handleShowCountry={handleShowCountry}/>            
        ) 
    } 
}

export default Countries