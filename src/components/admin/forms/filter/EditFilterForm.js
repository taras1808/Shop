import { useState, useEffect } from 'react'
import '../AdminPanelForm.css'
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { useParams, useHistory } from 'react-router-dom'
import OptionsTree from './tree/OptionsTree'
import { categoriesService } from '../../../../_services/categories.service'
import { filtersService } from '../../../../_services/filters.service'


export default function EditFilterForm() {

    const history = useHistory()

    const { filterId } = useParams()

    const [optionsCategories, setOptionsCategories] = useState([])

    const [filterName, setFilterName] = useState("")
    const [name, setName] = useState("")
    const [url, setURL] = useState("")
    const [categories, setCategories] = useState([])

    const [selectedFilter, setSelectedFilter] = useState(null)

    useEffect(() => {
        filtersService.getFilter(filterId)
            .then(
                (result) => {
                    setFilterName(result.title)
                    setName(result.title)
                    setURL(result.name)
                    setCategories(result.categories.map(e => ({ value: e.id, label: e.name })))
                    setSelectedFilter(result)
                },
                (error) => alert(error)
            )

        categoriesService.getCategories()
            .then(
                (result) => setOptionsCategories(result.map(e => ({ ...e, value: e.id, label: e.name }))),
                (error) => alert(error)
            )
    }, [filterId])

    const onEdit = () => {
        filtersService.updateFilter(selectedFilter, name, url, categories)
            .then(
                (result) => {
                    alert("OK")
                    setFilterName(result.title)
                },
                (error) => alert(error)
            )
    }

    const onDelete = () => {
        filtersService.deleteFilter(selectedFilter)
            .then(
                (result) => {
                    alert("OK")
                    history.push('/admin/filters/')
                },
                (error) => alert(error)
            )
    }

    return (
        <div className="admin-panel-form">
            <h2 className="admin-panel-title">Edit filter - { filterName }</h2>

            {
                selectedFilter &&
                    <>
                        <p className="admin-panel">Nazwa</p>
                        <input value={name} type="text" onChange={e => setName(e.target.value)} />

                        <p className="admin-panel">URL</p>
                        <input value={url} type="text" onChange={e => setURL(e.target.value)} />

                        <p className="admin-panel">Kategorii:</p>
                        <Select styles={SelectStyles}
                            isClearable
                            isMulti
                            value={categories}
                            options={optionsCategories} 
                            onChange={e => setCategories(e)} />


                        <div className="submit" onClick={onEdit}>Save</div>

                        <div className="submit delete" onClick={onDelete}>Delete</div>

                        {
                            selectedFilter.type === 0 && <OptionsTree filterId={filterId} />
                        }
                    </>
            }
        </div>
    );
}
