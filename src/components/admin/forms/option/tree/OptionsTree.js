import { useEffect, useState } from 'react'
import './OptionsTree.css'
import { Link } from 'react-router-dom'


export default function CategoriesTree() {

    const [treeOptions, setTreeOptions] = useState([])

    useEffect(() => {
        fetch('http://192.168.0.108:7777/api/filters/')
            .then(res => res.json())
            .then(
                (result) => {
                    const map = new Map()
                    result.forEach(e => {
                        const categories = e.categories.map(e => e.name).join(', ')
                        map.set(categories, [...map.get(categories) ?? [], e])
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
                    <h2>{ key }</h2>
                    <div className="childrens-block">
                        {
                            values.map((e, index) => (
                                <div key={index} className="options-tree">
                                    <p>{ e.title }</p>
                                    <div className="options-tree-childrens-block">
                                        {
                                            e.options.map((e, index) => (
                                                <Link key={index} className="dragable-block" to={`/admin/option/edit/${e.id}/`}>
                                                    {e.value}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))
        }
        </div>
    )
}
