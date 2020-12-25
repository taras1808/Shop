import { useState, useEffect } from 'react';
import '../../AdminPanelForm.css';
import { useParams, useHistory } from 'react-router-dom'


export default function EditOptionForm() {

    const history = useHistory()

    const { filterId, optionId } = useParams()

    const [selectedOption, setSelectedOption] = useState(null)

    const [optionValue, setOptionValue] = useState("")
    const [value, setValue] = useState("")
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        fetch(`http://192.168.0.108:7777/api/options/${optionId}/`)
            .then(res => res.json())
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

        fetch(`http://192.168.0.108:7777/api/options/${selectedOption.id}/`, {
            method: 'PUT',
            body: JSON.stringify({
                value,
                filter: filter.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(
            (result) => {
                alert("OK")
                setOptionValue(result.value)
            },
            (error) => alert(error)
        )
    }

    const onDelete = () => {

        fetch(`http://192.168.0.108:7777/api/options/${selectedOption.id}/`, {
            method: 'DELETE'
        })
        .then(result => result.json())
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
