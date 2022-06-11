import React from "react";

const Filter = ({newFilter,handleFilter}) => 
<>
    Filter shown with <input value={newFilter} onChange={handleFilter}/>
</>

export default Filter