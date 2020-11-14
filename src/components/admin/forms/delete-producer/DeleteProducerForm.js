import { useState, useEffect } from 'react';
import './DeleteProducerForm.css';
import Select from 'react-select'
import { SelectStylesMarginBottom, SelectStyles } from '../../../styles/CustomStyle'

export default function DeleteProducerForm() {

    const [optionsProducers, setOptionsProducers] = useState([])

    const [selectedProducer, setSelectedProducer] = useState(null)
    const [categories, setCategories] = useState([])
    

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/producers")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsProducers(result.map(e => { return {...e, value: e.id, label: e.name }}));
                }, (error) => {}
            )
    }, [])

    useEffect(() => {
        if (!selectedProducer) return
            fetch("http://192.168.0.108:7777/api/producers/" + selectedProducer.id)
                .then(res => res.json())
                .then(
                    (result) => {
                        setCategories(result.categories)
                    }, (error) => {}
                )
    }, [selectedProducer])
    

    const onSubmit = (e) => {
        e.preventDefault()
        fetch("http://192.168.0.108:7777/api/producers/" + selectedProducer.id, {
            method: 'DELETE'
        }).then(result => result.json())
            .then(result => {
                alert("OK")
                const arr = optionsProducers.filter(e => e.value !== selectedProducer.id)
                setOptionsProducers(arr)
                setSelectedProducer(null)
            })
    }
    
    return (
        <form className="form-add-producer" 
            method="DELETE" 
            onSubmit={onSubmit} 
            action="">

            <h2>Select a producer</h2>

            <Select 
                styles={SelectStylesMarginBottom} 
                options={optionsProducers}
                value={selectedProducer}
                onChange={e => setSelectedProducer(e) }
            />

            {
                selectedProducer ? (
                    <>
                        <label>Nazwa: {selectedProducer.name}</label>

                        <label>Kategoria: {categories.map(e => e.name).join(', ')}</label>

                        <button className="submit">Delete producer</button>
                    </>
                ) : null
            }
        </form>
    );
    
}