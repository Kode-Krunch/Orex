import { useEffect, useState } from 'react'
import { apiGetChannelmasterdrop } from 'services/MasterService'
import { useSelector } from 'react-redux'
import { Input } from 'components/ui'
import './Common.css';
import SearchInput from './SearchInput';
import { HiOutlineSearch } from 'react-icons/hi';

function SearchableInput({ data, placeholder, SelectedItem, setSelectedItem }) {

    const [dropdownOptions, setDropdownOptions] = useState([])
    const [inputvalue, setInputValue] = useState([])
    const [showDropdown, setShowDropdown] = useState(false);
    const handleSelectOption = (label, value) => {
        setInputValue(label);
        setSelectedItem({ label: label, value: value })
        setShowDropdown(false);
    };
    const GetSuggestion = (e, table) => {
        const value = e.target.value;
        console.log('value', data, value)
        setInputValue(value);
        if (value.length >= 1) {
            const filteredOptions = data.filter(option =>
                option.label.toLowerCase().includes(value.toLowerCase())
            );
            setDropdownOptions(filteredOptions);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };
    const handleInputFocus = () => {


    };
    return (
        <>
            <div className="input-container" >

                <Input size="lg"
                    type="text"
                    value={inputvalue}
                    placeholder={placeholder}
                    onFocus={() => handleInputFocus()}
                    onChange={(e) => {
                        GetSuggestion(e);
                        //handleChange(parentKey, key, e.target.value, index);
                    }}

                />
                <SearchInput></SearchInput>




            </div>
        </>
    )


}
export default SearchableInput
