import { useState, useEffect } from 'react';
import './ProducerForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'

export default function ProducentForm() {

    const [optionsCategories, setOptionsCategories] = useState([])

    const [name, setName] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsCategories(result.map(e => { return { value: e.id, label: e.name }}));
                },
                (error) => {}
            )
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        fetch("http://192.168.0.108:7777/api/producers", {
            method: 'POST',
            body: JSON.stringify({ name, categories }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_ => {
            alert("OK")
            e.target.reset()
        })
    }
    
    return (
        <form className="form-add-producer" 
            method="POST" 
            onSubmit={onSubmit} 
            action="">

            <h2>Add a producent</h2>

            <label>Nazwa</label>
            <input className="input-field"
                type="text" 
                onChange={e => setName(e.target.value)}/>

            <label>Kategorii:</label>
            <Select isMulti 
                styles={SelectStyles} 
                options={optionsCategories} onChange={e => setCategories(e ? e.map(e => e.value) : [])}
            />

            <button className="submit">Save producer</button>
        </form>
    );
    
}