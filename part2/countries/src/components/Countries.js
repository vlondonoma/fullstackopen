import React from "react";
import Country from "./Country";

const Countries = ({countries}) => {
    if(countries.length===0){
        return <p>None results</p>
    }else if(countries.length===1){
        return <Country country={countries[0]}></Country>
    }else if( countries.length>10){
        return <p>Too many matches, specify another filter</p>;
    }else{
        return countries.map(
            country => 
            <p key={country.ccn3}>{country.name.common}</p>
        ) 
    } 
}

export default Countries