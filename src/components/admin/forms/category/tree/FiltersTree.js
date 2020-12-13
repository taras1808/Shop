import { useEffect, useState } from 'react'
import './CategoriesTree.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useParams, Link } from 'react-router-dom'


export default function FiltersTree() {

    const { categoryId } = useParams()

    const [treeFilters, setTreeFilters] = useState([])

    useEffect(() => {
        fetch(`http://192.168.0.108:7777/api/categories/${categoryId}/fitlers`)
            .then(res => res.json())
            .then(
                (result) => setTreeFilters(result),
                (error) => alert(error)
            )
    }, [categoryId])

    const onSubmit = () => {

        fetch(`http://192.168.0.108:7777/api/categories/${categoryId}/fitlers`, {
            method: 'PUT',
            body: JSON.stringify({
                filters: treeFilters.map(e => e.id)
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
        const arr = Array.from(treeFilters);
        const [removed] = arr.splice(result.source.index, 1);
        arr.splice(result.destination.index, 0, removed);
        setTreeFilters(arr)
    }

    return treeFilters.length > 0 ? (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div className="category-tree" ref={provided.innerRef}> 
                            {
                                treeFilters.map((e, index) => (
                                    <Draggable 
                                        index={index} 
                                        key={e.id}
                                        draggableId={`${e.id}`}>
                                        {
                                            (provided, snapshot) => (
                                                <div className="dragable-block" ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>

                                                    <Link { ...e.type !== 1 ? { to: `/admin/filters/${e.id}/` } : null }>
                                                        {e.title}
                                                    </Link>

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

            { treeFilters.length > 1 ? <div className="submit" onClick={onSubmit}>Save order</div> : null }
        </>
    ) : <span>None</span>
}
