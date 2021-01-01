import { useState } from 'react';
import '../../AdminPanelForm.css';
import { useParams, useHistory } from 'react-router-dom'
import { optionsService } from '../../../../../_services/options.service'


export default function AddProductForm() {

    const history = useHistory()

    const { filterId } = useParams()

    const [value, setValue] = useState("")

    const onSubmit = () => {
        optionsService.createOption(value,  filterId)
            .then(
                (result) => {
                    alert("OK")
                    history.push(`${result.id}/`)
                },
                (error) => alert(error)
            )
    }

    return (
        <div className="admin-panel-form">
            <h2 className="admin-panel-title">New option</h2>

            <p className="admin-panel">Value</p>
            <input value={value} type="text" onChange={e => setValue(e.target.value)} />

            <div className="submit" onClick={onSubmit}>Save option</div>
        </div>
    );
}
