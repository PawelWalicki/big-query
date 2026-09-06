import Select from "react-select";

export function CountrySelect({options, setCountryFilter} ) {
   
    const countrySelected = (list) => {
        setCountryFilter(list.map((e) => e.value))
    }

    return (
        <Select className="w-md" onChange = {(e) => countrySelected(e)}  isMulti options={options} >
           
        </Select>
    )
}