import React from "react";

const PersonForm = ({newName,handleNameChange,newPhone,handlePhoneChange,addName}) => 
    <form>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/><br/>
          Number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>Add</button>
        </div>
    </form> 

export default PersonForm