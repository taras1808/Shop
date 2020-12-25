import { useEffect, useState } from 'react'
import './CategoriesTree.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useParams, Link } from 'react-router-dom'


export default function CategoriesTree() {

    const { categoryId } = useParams()

    const [treeCategories, setTreeCategories] = useState([])

    useEffect(() => {
        fetch(`http://192.168.0.108:7777/api/categories/roots${categoryId ? `?categoryId=${categoryId}` : ''}`)
            .then(res => res.json())
            .then(
                (result) => setTreeCategories(result),
                (error) => alert(error)
            )
    }, [categoryId])

    const onSubmit = () => {

        fetch('http://192.168.0.108:7777/api/categories/', {
            method: 'PUT',
            body: JSON.stringify({
                categories: treeCategories.map(e => e.id)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(
            (result) => alert("OK"),
            (error) => alert(error)
        )
    }

    const onDragEnd = result => {
        if (!result.destination) return
        const arr = Array.from(treeCategories);
        const [removed] = arr.splice(result.source.index, 1);
        arr.splice(result.destination.index, 0, removed);
        setTreeCategories(arr)
    }

    const build = (children, index) => (
        <div className="parent-block" key={index}>
            <Link to={`/admin/categories/${children.id}/`}>
                {children.name}
            </Link>

            { 
                children.childrens.length > 0 ? (
                    <div className="childrens-block">
                        { children.childrens.map(build) }
                    </div>
                ) : null 
            }
        </div>
    )

    return (
        <div className="parent-block">
            { categoryId ? <p>Childrens</p> : null }
            <div className="childrens-block">
            {
                treeCategories.length > 0 ? (
                    <>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div className="category-tree" ref={provided.innerRef}> 
                                        {
                                            treeCategories.map((e, index) => (
                                                <Draggable 
                                                    index={index} 
                                                    key={e.id}
                                                    draggableId={`${e.id}`}>
                                                    {
                                                        (provided, snapshot) => (
                                                            <div className="dragable-block" ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>

                                                                <Link to={`/admin/categories/${e.id}/`}>
                                                                    {e.name}
                                                                </Link>

                                                                { 
                                                                    e.childrens.length > 0 ? (
                                                                        <div className="childrens-block">
                                                                            { e.childrens.map(build) }
                                                                        </div>
                                                                    ) : null 
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                        { treeCategories.length > 1 ? <div className="submit" onClick={onSubmit}>Save order</div> : null }
                    </>
                ) : null
            }
            </div>
        </div>
    )
}
