import React from "react";

const PersonForm = ({newName,handleNameChange,newPhone,handlePhoneChange,addPhone}) => 
    <form>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/><br/>
          Number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPhone}>Add</button>
        </div>
    </form> 

export default PersonForm