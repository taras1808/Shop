import { useState, useEffect } from 'react';
import './AddProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'

export default function AddProductForm() {

    // const [optionsCategories, setOptionsCategories] = useState([])
    // const [optionsProducers, setOptionsProducers] = useState([])

    // const [name, setName] = useState("")
    // const [price, setPrice] = useState("")
    // const [oldPrice, setOldPrice] = useState("")
    // const [image, setImage] = useState("")
    // const [category, setCategory] = useState(null)
    // const [producer, setProducer] = useState(null)

    // useEffect(() => {
    //     fetch("http://192.168.0.108:7777/api/categories")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setOptionsCategories(result.map(e => { return { value: e.id, label: e.name }}));
    //             },
    //             (error) => {}
    //         )

    // }, [])

    // useEffect(() => {
    //     if (!category) return
    //     setProducer("")
    //     fetch("http://192.168.0.108:7777/api/categories/" + category + "/producers")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setOptionsProducers(result.map(e => { return { value: e.id, label: e.name }}));
    //             },
    //             (error) => {}
    //         )
    // }, [category])

    // const onSubmit = (e) => {
    //     e.preventDefault()

    //     const formData = new FormData()
    //     formData.append('file', image)
    //     formData.append('category', category)
    //     formData.append('producer', producer)
    //     formData.append('price', price)
    //     formData.append('old_price', oldPrice)
    //     formData.append('name', name)

    //     fetch("http://192.168.0.108:7777/api/products", {
    //         method: 'POST',
    //         body: formData
    //     }).then(data => {
    //         alert("OK")
    //         console.log(data)
    //         e.target.reset()
    //     })
    // }
    
    return (
        // <form className="add-product-form" 
        //     method="POST" 
        //     onSubmit={onSubmit} action="" 
        //     encType="multipart/form-data">
        //     <h2>New product</h2>

        //     <label>Kategoria:</label>
        //     <Select styles={SelectStyles} 
        //         options={optionsCategories} 
        //         onChange={e => setCategory(e.value)}
        //     />

        //     <label>Producent:</label>
        //     <Select styles={SelectStyles} 
        //         options={optionsProducers} 
        //         value={optionsProducers.filter(e => e.value === producer)} 
        //         onChange={e => setProducer(e.value)}
        //     />

        //     <label>Nazwa</label>
        //     <input type="text" 
        //         onChange={e => setName(e.target.value)}/>

        //     <label>Cena</label>
        //     <input type="text" 
        //         onChange={e => setPrice(e.target.value)}/>

        //     <label>Old price</label>
        //     <input type="text"
        //         onChange={e => setOldPrice(e.target.value)}/>

        //     <label>Image</label>

        //     {image ? (
        //         <span className="close" onClick={() => setImage(null)}>Remove</span>
        //     ) : null}

        //     {
        //         image ? (
        //             <>
        //                 <img src={URL.createObjectURL(image) } alt=""/>
        //             </>
        //         ) : (
        //             <label className="select-image">
        //                 Select image...
        //                 <input type="file" 
        //                     accept="image/png, image/jpeg" 
        //                     onChange={e => setImage(e.target.files[0])}/>
        //             </label>
        //         )
        //     }

        //     <button className="submit">Save product</button>

        // </form>

        <></>
    );
}
