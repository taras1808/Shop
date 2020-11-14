import { useState, useEffect } from 'react';
import './UpdateProducerForm.css';
import Select from 'react-select'
import { SelectStylesMarginBottom, SelectStyles } from '../../../styles/CustomStyle'

export default function UpdateProducerForm() {

    const [optionsCategories, setOptionsCategories] = useState([])
    const [optionsProducers, setOptionsProducers] = useState([])

    const [selectedProducer, setSelectedProducer] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([])

    const [name, setName] = useState("")

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsCategories(result.map(e => { return { value: e.id, label: e.name }}));
                }, (error) => {}
            )

        fetch("http://192.168.0.108:7777/api/producers")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsProducers(result.map(e => { return { value: e.id, label: e.name }}));
                }, (error) => {}
            )
    }, [])

    useEffect(() => {
        if (!selectedProducer) return
        fetch("http://192.168.0.108:7777/api/producers/" + selectedProducer.value + "/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    setSelectedCategories(result.map(e => { return { value: e.id, label: e.name }}));
                }, (error) => {}
            )
    }, [selectedProducer])

    const onSubmit = (e) => {
        e.preventDefault()
        fetch("http://192.168.0.108:7777/api/producers/" + selectedProducer.value, {
            method: 'PUT',
            body: JSON.stringify({ name, categories: selectedCategories.map(e => e.value) }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => result.json())
            .then(result => {
                alert("OK")
                const arr = optionsProducers.filter(e => e.value !== result.id)
                const updated = { value: result.id, label: result.name }
                setOptionsProducers([...arr, updated])
                setSelectedProducer(updated)
            })
    }
    
    return (
        <form className="form-add-producer" 
            method="POST" 
            onSubmit={onSubmit} 
            action="">

            <h2>Select a producer</h2>

            <Select 
                styles={SelectStylesMarginBottom} 
                options={optionsProducers}
                value={selectedProducer}
                onChange={e => {
                    setName(e.label)
                    setSelectedProducer(e)
                }}
            />

            {
                selectedProducer ? (
                    <>
                        <label>Nazwa</label>
                        <input className="input-field" 
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}/>

                        <label>Kategorii:</label>
                        <Select isMulti 
                            styles={SelectStyles} 
                            value={selectedCategories}
                            options={optionsCategories} onChange={e => setSelectedCategories(e)}
                        />

                        <button className="submit">Update producer</button>
                    </>
                ) : null
            }
        </form>
    );
    
}