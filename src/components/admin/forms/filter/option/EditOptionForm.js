import { useState, useEffect } from 'react';
import '../../AdminPanelForm.css';
import { useParams, useHistory } from 'react-router-dom'
import { optionsService } from '../../../../../_services/options.service'


export default function EditOptionForm() {

    const history = useHistory()

    const { filterId, optionId } = useParams()

    const [selectedOption, setSelectedOption] = useState(null)

    const [optionValue, setOptionValue] = useState("")
    const [value, setValue] = useState("")
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        optionsService.getOption(optionId)
            .then(
                (result) => {
                    setOptionValue(result.value)
                    setValue(result.value)
                    setFilter(result.filter)
                    setSelectedOption(result)
                },
                (error) => alert(error)
            )
    }, [optionId])

    const onEdit = () => {
        if (parseInt(filterId) !== filter.value) return
        optionsService.updateOption(selectedOption, value, filter)
            .then(
                (result) => {
                    alert("OK")
                    setOptionValue(result.value)
                },
                (error) => alert(error)
            )
    }

    const onDelete = () => {
        optionsService.deleteOption(selectedOption)
            .then(
                (result) => {
                    alert("OK")
                    history.push('../../')
                },
                (error) => alert(error)
            )
    }

    return (
        <div className="admin-panel-form">
            <h2 className="admin-panel-title">Edit option - { optionValue }</h2>

            {
                selectedOption ? (
                    <>
                        <p className="admin-panel">Value</p>
                        <input value={value} type="text" onChange={e => setValue(e.target.value)} />

                        <p className="admin-panel">Filter:</p>
                        <span>{ filter.title }</span>

                        <div className="submit" onClick={onEdit}>Save</div>

                        <div className="submit delete" onClick={onDelete}>Delete</div>
                    </>
                ) : null
            }
        </div>
    );
}
