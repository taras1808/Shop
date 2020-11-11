import { useState, useEffect } from 'react';
import './ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'

export default function ProductForm() {

    const [optionsCategories, setOptionsCategories] = useState([])
    const [optionsProducents, setOptionsProducents] = useState([])

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [category, setCategory] = useState(null)
    const [producent, setProducent] = useState(null)

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/category")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsCategories(result.map(e => { return { value: e.id, label: e.name }}));
                },
                (error) => {}
            )

    }, [])

    useEffect(() => {
        if (!category) return
        setProducent("")
        fetch("http://192.168.0.108:7777/api/category/" + category + "/producents")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsProducents(result.map(e => { return { value: e.id, label: e.name }}));
                },
                (error) => {}
            )
    }, [category])

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('file', image)
        formData.append('category', category)
        formData.append('producent', producent)
        formData.append('price', price)
        formData.append('name', name)

        fetch("http://192.168.0.108:7777/api/product", {
            method: 'POST',
            body: formData
        }).then(_ => e.target.reset())
    }
    
    return (
        <form className="add-product-form" 
            method="POST" 
            onSubmit={onSubmit} action="" 
            encType="multipart/form-data">
            <h2>Add a product</h2>

            <label>Kategoria:</label>
            <Select styles={SelectStyles} 
                options={optionsCategories} 
                onChange={e => setCategory(e.value)}/>

            <label>Producent:</label>
            <Select styles={SelectStyles} 
                options={optionsProducents} 
                value={optionsProducents.filter(e => e.value === producent)} 
                onChange={e => setProducent(e.value)}/>

            <label>Nazwa</label>
            <input type="text" 
                onChange={e => setName(e.target.value)}/>

            <label>Cena</label>
            <input type="text" 
                onChange={e => setPrice(e.target.value)}/>

            <label>Image</label>

            {image ? (
                <span className="close" onClick={() => setImage(null)}>Remove</span>
            ) : null}

            {
                image ? (
                    <>
                        <img src={URL.createObjectURL(image)} />
                    </>
                ) : (
                    <label className="select-image">
                        Select image...
                        <input type="file" 
                            accept="image/png, image/jpeg" 
                            onChange={e => setImage(e.target.files[0])}/>
                    </label>
                )
            }

            <button className="submit">Save product</button>

        </form>
    );
}
