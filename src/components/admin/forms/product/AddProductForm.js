import { useState, useEffect } from 'react';
import '../AdminPanelForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { FilterType } from '../../../filters/FiltersContainer'
import SelectImagesBlock from '../block/images/SelectImagesBlock'
import { useHistory } from 'react-router-dom'
import { categoriesService } from '../../../../_services/categories.service'
import { productsService } from '../../../../_services/products.service'


export default function AddProductForm() {

    const history = useHistory()

    const [optionsCategories, setOptionsCategories] = useState([])

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [oldPrice, setOldPrice] = useState("")
    const [productInfo, setProductInfo] = useState("")
    const [images, setImages] = useState([])
    const [category, setCategory] = useState(null)

    const [filters, setFilters] = useState([])

    const [productOptions, setProductOptions] = useState(new Map())

    useEffect(() => {
        categoriesService.getCategories()
            .then(
                (result) => setOptionsCategories(result.map(e => ({ ...e, value: e.id, label: e.name }))),
                (error) => alert(error)
            )
    }, [])

    useEffect(() => {
        if (!category) {
            setFilters([])
            setProductOptions(new Map())
            return
        }
        categoriesService.getFiltersForCategory(category)
			.then(
                (result) => {
                    setFilters(result.filter(e => e.type === FilterType.SELECT))
                    setProductOptions(new Map())
                }, 
                (error) => alert(error)
            )
    }, [category])

    const onSubmit = () => {
        const formData = new FormData()
        images.forEach((image,  index) => formData.append('file_' + index, image))
        if (category) formData.append('category_id', category.id)
        formData.append('options', JSON.stringify(Array.from(productOptions)))
        formData.append('price', price)
        if (oldPrice) formData.append('old_price', oldPrice)
        formData.append('name', name)
        if (productInfo !== '') formData.append('info', productInfo)

        productsService.createProduct(formData)
            .then(
                (result) => {
                    alert("OK")

                    const parameters = new Map()

                    parameters.set('category', result.category_id)
                    parameters.set('product', result.id)

                    let params = Array.from(parameters)
                        .filter(e => e && `${e[1]}`.length > 0)
                        .map(e => e.join('='))
                        .join(';')

                    history.push(`/admin/products/${params !== '' ? params + '/' : ''}`)
                },
                (error) => alert(error)
            )
    }

    return (
        <div className="admin-panel-form">
            <h2 className="admin-panel-title">New product</h2>

            <p className="admin-panel">Kategoria:</p>
            <Select styles={SelectStyles}
                isClearable
                value={category}
                options={optionsCategories} 
                onChange={e => setCategory(e)} />

            <p className="admin-panel">Nazwa</p>
            <input value={name} type="text" onChange={e => setName(e.target.value)} />

            <p className="admin-panel">Cena</p>
            <input value={price} type="text" onChange={e => setPrice(e.target.value)} />

            <p className="admin-panel">Old price</p>
            <input value={oldPrice} type="text" onChange={e => setOldPrice(e.target.value)} />

            <p className="admin-panel">Product information</p>
            <textarea value={productInfo} onChange={e => setProductInfo(e.target.value)}/>

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

            <SelectImagesBlock {...{images, setImages}} />

            <div className="submit" onClick={onSubmit}>Save product</div>

        </div>
    );
}
