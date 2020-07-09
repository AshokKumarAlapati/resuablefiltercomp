import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ColumnDropdown = ({columnName,columnList,handleFilter,isFilterApplied}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState("-Select-");

  const toggle = () => setDropdownOpen(prevState => !prevState);
const onSelect = (event) => {
    setValue(event.currentTarget.textContent);
    handleFilter(columnName,event.currentTarget.textContent)
}
useEffect(()=>{
if(!isFilterApplied){
    setValue("-Select-")
}
},[isFilterApplied])
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {value}
        </DropdownToggle>
      <DropdownMenu>
        {columnList.map((columnValue, index) => <DropdownItem key={index} onClick={onSelect}>{columnValue}</DropdownItem>)}
      </DropdownMenu>
    </Dropdown>
  );
}

export default ColumnDropdown;