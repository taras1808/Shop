import { red } from "@material-ui/core/colors"

export const SelectStyles = {
    option: (provided) => ({
        ...provided,
        cursor: 'pointer'
    }),
    control: (provided) => ({
        ...provided,
		cursor: 'pointer'
    })
}

export const ErrorSelectStyles = {
    option: (provided) => ({
        ...provided,
        cursor: 'pointer'
    }),
    control: (provided) => ({
        ...provided,
        cursor: 'pointer',
        borderColor: red
    })
}
