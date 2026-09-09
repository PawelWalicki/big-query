import Select from "react-select";

export function CountrySelect({ options, setCountryFilter }) {

    const handleChange = (list) => {
        const countries = list ? list.map((e) => e.value) : [];

        setCountryFilter(countries);
    };


    return (
        <Select className="w-md placeholder: () => text-slate-400"
            onChange={handleChange}
            isMulti
            options={options} 
            placeholder="Change countries...">

        </Select>
    )
}