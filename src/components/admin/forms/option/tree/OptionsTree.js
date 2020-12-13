import { useEffect, useState } from 'react'
import './OptionsTree.css'
import { Link } from 'react-router-dom'


export default function CategoriesTree() {

    const [treeOptions, setTreeOptions] = useState([])

    useEffect(() => {
        fetch('http://192.168.0.108:7777/api/options/')
            .then(res => res.json())
            .then(
                (result) => {
                    const map = new Map()
                    result.forEach(e => {
                        const filter = e.filter ? e.filter.title : null
                        const categories = e.filter ? e.filter.categories.map(e => e.name).join(' - ') : null
                        map.set(categories, map.get(categories) ?? new Map())
                        map.get(categories).set(filter, map.get(categories).get(filter) ?? [])
                        map.get(categories).get(filter).push(e)
                    })
                    setTreeOptions(Array.from(map))
                },
                (error) => alert(error)
            )
    }, [])

    return (
        <div className="block-options-tree">
        { 
            treeOptions.map(([ key, values ], index) => (
                <div key={index} className="parent-block"> 
                    { key ? <h2>{ key }</h2> : null }
                    <div className="childrens-block">
                        {
                            Array.from(values).map(([key, options], index) => (
                                key ? (
                                    <div key={index} className="options-tree">
                                        <p>{ key }</p>
                                        <div className="options-tree-childrens-block">
                                            {
                                                options.map((e, index) => (
                                                    <Link key={index} className="dragable-block" to={`/admin/options/${e.id}/`}>
                                                        {e.value}
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ) : options.map((e, index) => (
                                    <Link key={index} className="dragable-block" to={`/admin/options/${e.id}/`}>
                                        {e.value}
                                    </Link>
                                ))
                            ))
                        }
                    </div>
                </div>
            ))
        }
        </div>
    )
}
