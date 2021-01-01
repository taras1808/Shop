import { useEffect, useState } from 'react'
import './FiltersTree.css'
import { Link } from 'react-router-dom'
import { filtersService } from '../../../../../_services/filters.service'


export default function OptionsTree({filterId}) {

    const [treeOptions, setTreeOptions] = useState([])

    useEffect(() => {
        filtersService.getFilterOptions(filterId)
            .then(
                (result) => {
                    setTreeOptions(result)
                },
                (error) => alert(error)
            )
    }, [filterId])

    return (
        <div className="block-tree">
            <div className="parent-block">
                <p>Options: </p>
                <div className="childrens-block">
                    { 
                        treeOptions.map((item, index) => (
                            <Link key={index} to={`/admin/filters/${filterId}/options/${item.id}/`}>
                                {item.value}
                            </Link>
                        ))
                    }
                    <Link to={`/admin/filters/${filterId}/options/`}>
                        +
                    </Link>
                </div>
            </div>
        </div>
    )
}
