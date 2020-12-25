import { useState, useEffect } from 'react'
import '../AdminPanelForm.css'
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { Link, useParams, useHistory } from 'react-router-dom'
import SelectImagesBlock from '../block/images/SelectImagesBlock'
import OldImagesBlock from '../block/images/OldImagesBlock'
import { build } from '../../../../utils/ParamsUtils'


export default function EditProductForm() {

    const history = useHistory()

    const { params } = useParams()

    const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

    const category = parameters.get('category') ?? null
    const product = parameters.get('product') ?? null

	const [state, setState] = useState(params)

    const [optionsProducts, setOptionsProducts] = useState([])
    const [optionsCategories, setOptionsCategories] = useState([])

    const [selectedCategory, setSelectedCategory] = useState(null)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [oldPrice, setOldPrice] = useState("")
    const [productInfo, setProductInfo] = useState("")

    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [filters, setFilters] = useState([])

    const [productOptions, setProductOptions] = useState(new Map())

    useEffect(() => {
		if (state !== params) {
			setState(params)
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params])

    useEffect(() => {
        fetch('http://192.168.0.108:7777/api/categories/')
            .then(res => res.json())
            .then(
                (result) => setOptionsCategories(
                    result.map(e => ({ value: e.id, label: e.name }))
                ),
                (error) => alert(error)
            )
    }, [])

    useEffect(() => {
        fetch(`http://192.168.0.108:7777/api/products/${ category ? `?categoryId=${category}` : ''}`)
            .then(res => res.json())
            .then(
                (result) => setOptionsProducts(
                    result.map(e => ({...e, value: e.id, label: e.name }))
                ),
                (error) => alert(error)
            )
    }, [category])

    useEffect(() => {
        const e = optionsProducts.filter(e => e.id === parseInt((product)))[0]
        if (e) {
            setName(e.label)
            setPrice(e.price)
            setProductInfo(e.info ?? '')
            setOldPrice(e.old_price ?? '')
            setOldImages(e.images)
            setSelectedCategory(
                optionsCategories.filter(item => item.value === e.category_id)[0] ?? null
            )
        }
        setImages([])

        if (!product) return
        
        fetch(`http://192.168.0.108:7777/api/products/${product}/options/`)
            .then(res => res.json())
            .then(
                (result) => {
                    const options = new Map()
                    result.forEach(e => options.set(e.filter_id, e.id))
                    setProductOptions(options)
                }, 
                (error) => alert(error)
            )

    }, [product, optionsProducts, optionsCategories])

    useEffect(() => {
        if (!selectedCategory) return
        fetch(`http://192.168.0.108:7777/api/filters/?categoryId=${selectedCategory.value}`)
            .then(res => res.json())
            .then(
                (result) => setFilters(result.filter(e => e.type === 0)),
                (error) => alert(error)
            )

    }, [selectedCategory])

    const onEdit = () => {

        const formData = new FormData()
        images.forEach((image,  index) => formData.append('file_' + index, image))
        if (selectedCategory) formData.append('category_id', selectedCategory.value)
        formData.append('options', JSON.stringify(Array.from(productOptions)))
        formData.append('price', price)
        if (oldPrice) formData.append('old_price', oldPrice)
        formData.append('images', JSON.stringify(oldImages))
        formData.append('name', name)
        if (productInfo !== '') formData.append('info', productInfo)

        fetch(`http://192.168.0.108:7777/api/products/${product}/`, {
            method: 'PUT',
            body: formData
        })
            .then(result => result.json())
            .then(
                (result) => {
                    alert("OK")
                    const arr = optionsProducts.filter(e => e.value !== result.id)
                    const updated = {...result, value: result.id, label: result.name }
                    setImages([])
                    setOldImages(result.images)
                    if (updated.id === category) {
                        setOptionsProducts([...arr, updated])
                    }
                },
                (error) => alert(error)
            )
    }

    const onDelete = () => {
        fetch(`http://192.168.0.108:7777/api/products/${product}/`, 
            { 
                method: 'DELETE' 
            })
            .then(result => result.json())
            .then(
                result => {
                    alert("OK")
                    const arr = optionsProducts.filter(e => e.value !== parseInt(product))
                    setOptionsProducts(arr)
                    const url = build(params, 'product', null)
                    history.push(`/admin/products/${url}`)
                },
                error => alert(error)
            )
    }
    
    return (
        <div className="admin-panel-form">

            <h2 className="admin-panel-title">Edit product</h2>

            <p className="admin-panel">Select category</p>
            <Select 
                isClearable
                styles={SelectStyles} 
                value={optionsCategories.filter(e => e.value === parseInt(category))[0]}
                options={optionsCategories} onChange={e => {
                    const url = build(params, 'category', e ? e.value : '')
                    history.push(`/admin/products/${url}`)
                }} />

            <p className="admin-panel">Select product</p>
            <Select 
                isClearable
                styles={SelectStyles} 
                options={optionsProducts}
                value={optionsProducts.filter(e => e.id === parseInt(product))[0]}
                onChange={e => {
                    const url = build(params, 'product', e.id)
                    history.push(`/admin/products/${url}`)
                }} />

            {
                product ? (
                    <>
                        <Link className="admin-panel-preview" target="_blank" to={`/product/${product}/`}>Look at product</Link>

                        <p className="admin-panel">Nazwa</p>
                        <input className="input-field" 
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />

                        <p className="admin-panel">Cena</p>
                        <input className="input-field" 
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)} />

                        <p className="admin-panel">Old price</p>
                        <input className="input-field" 
                            type="text"
                            value={oldPrice}
                            onChange={e => setOldPrice(e.target.value)} />

                        <p className="admin-panel">Product information</p>
                        <textarea value={productInfo} onChange={e => setProductInfo(e.target.value)}/>

                        <p className="admin-panel">Kategoria:</p>
                        <Select 
                            isClearable
                            styles={SelectStyles} 
                            value={selectedCategory}
                            options={optionsCategories} onChange={e => setSelectedCategory(e)} />

                        {
                            filters.map((filter, index) => {
                                let options = filter.options.map(e => ({ value: e.id, label: e.value }))
                                    
                                return (
                                    <div key={index}>
                                        <p className="admin-panel">{ filter.title }</p>
                                        <Select styles={SelectStyles} 
                                            isClearable
                                            options={options}
                                            value={options.filter(e => e.value === productOptions.get(filter.id))}
                                            onChange={e => {
                                                productOptions.set(filter.id, e.value)
                                                setProductOptions(new Map(productOptions))
                                            }} />
                                    </div>
                                )
                            })
                        }   

                        <button className="submit" onClick={onEdit}>Save</button>

                        <SelectImagesBlock {...{images, setImages}} />
                        <OldImagesBlock {...{oldImages, setOldImages}} />
                        
                        <button className="submit delete" onClick={onDelete}>Delete</button>

                    </>
                ) : null
            }
        </div>
    );
    
}