import React from "react";

const Person = ({person,handleDelete}) => 
<>
    <p>{person.name} {person.number} <button value={person.id} onClick={handleDelete}>Delete</button></p>
</>

export default Person