import React from "react";

const Filter = ({newFilter,handleFilter}) => 
<>
    Filter countries <input value={newFilter} onChange={handleFilter}/>
</>

export default Filter