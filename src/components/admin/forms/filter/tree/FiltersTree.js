import { useEffect, useState } from 'react'
import './FiltersTree.css'
import { Link } from 'react-router-dom'


export default function FiltersTree() {

    const [treeOptions, setTreeOptions] = useState([])

    useEffect(() => {
        fetch('http://192.168.0.108:7777/api/filters/')
            .then(res => res.json())
            .then(
                (result) => {
                    const map = new Map()
                    result.forEach(e => {
                        const categories = e.categories.map(e => e.name).join(' - ')
                        map.set(categories, map.get(categories) ?? new Map())
                        map.get(categories).set(e.title, e)
                    })
                    console.log(Array.from(map))
                    setTreeOptions(Array.from(map))
                },
                (error) => alert(error)
            )
    }, [])

    return (
        <div className="block-tree">
        { 
            treeOptions.map(([ key, values ], index) => (
                <div key={index} className="parent-block"> 
                    { key ? <p>{ key }</p> : null }
                    <div className="childrens-block">
                        {
                            Array.from(values).map(([key, value], index) => (
                                <Link key={index} className="options-tree" to={`/admin/filters/${value.id}/`}>
                                    <p>{ value.title }</p>
                                    <div className="options-tree-childrens-block">
                                        {
                                            value.options.map((e, index) => (
                                                <div className="option">
                                                {/* <Link key={index} to={`/admin/filters/${value.id}/options/${e.id}/`}> */}
                                                    {e.value}
                                                {/* </Link> */}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            ))
        }
        </div>
    )
}
