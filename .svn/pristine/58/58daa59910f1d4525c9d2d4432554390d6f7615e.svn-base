const closeDropDowns = (event, dropdownRef, setSecTableToolbarState) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setSecTableToolbarState((prevState) => ({
      ...prevState,
      isManageColumnsDropdownVisible: false,
    }));
  }
};

export { closeDropDowns };
