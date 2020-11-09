import { useState, useEffect } from 'react';
import './AdminContainer.css'
import Select from 'react-select'

const customStyles = {
    option: (provided) => ({
        ...provided,
        cursor: 'pointer'
    }),
    control: (provided) => ({
        ...provided,
		cursor: 'pointer',
		marginBottom: 10
    })
}

function AdminContainer () {

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
		fetch("http://192.168.0.108:7777/api/category/" + category + "/producents")
			.then(res => res.json())
			.then(
				(result) => {
					setOptionsProducents(result.map(e => { return { value: e.id, label: e.name }}));
				},
				(error) => {}
			)
	}, [category])

	const send = (e) => {
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

	const sendProducent = (e) => {
		e.preventDefault()
		fetch("http://192.168.0.108:7777/api/producent", {
			method: 'POST',
			body: JSON.stringify({ name, category }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(_ => e.target.reset())
	}

	return (
		<div className="container">

			<form method="POST" onSubmit={send} action="" encType="multipart/form-data">
				<h2>Add a product</h2>

				<label>Kategoria:</label>
				<Select styles={customStyles} id="sort" options={optionsCategories} onChange={e => setCategory(e.value)}/>

				<label>Producent:</label>
				<Select styles={customStyles} id="sort" options={optionsProducents} value={optionsProducents.filter(e => e.value === producent)} onChange={e => setProducent(e.value)}/>

				<label>Nazwa</label>
				<input className="input-field" type="text" onChange={e => setName(e.target.value)}/>

				<label>Cena</label>
				<input className="input-field" type="text" onChange={e => setPrice(e.target.value)}/>

				<label>Image</label>
				<input className="input-field" type="file" onChange={e => setImage(e.target.files[0])}/>

				<button className="submit">Add</button>

			</form>

			{/* <form method="POST" onSubmit={sendProducent} action="">
				<h2>Add a producent</h2>

				<label>Nazwa</label>
				<input className="input-field" type="text" onChange={e => setName(e.target.value)}/>

				<label>Kategorii:</label>
				<Select isMulti styles={customStyles} id="sort" options={optionsCategories} onChange={e => setCategory(e.map(e => e.value))}/>


				<button className="submit">Add</button>

			</form> */}
			
		</div>
	)
}

export default AdminContainer;
