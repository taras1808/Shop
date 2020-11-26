import React, { useState, useEffect, useRef } from 'react'
import './ImagesGallery.css'


export default function ImagesGallery ({ images }) {

    const [selectedImage, setSelectedImage] = useState(null)

    const ref = useRef()

    useEffect(() => {
        if (images) setSelectedImage(images[0])
    }, [images])

    return (
        <div className="images-gallery-block">

            <div ref={ref} className="images-gallery-thumbnails-block">

                    {
                        images ? images.map((image, index) => (
                            <div key={index} className={image === selectedImage ? "images-gallery-thumbnail active" : "images-gallery-thumbnail"} onClick={_ => {
                                setSelectedImage(images[index])
                            }}>

                                <img src={image.image}></img>
            
                            </div>
                        )) : null
                    }


            </div>

            <div className="images-gallery-image-block">

                <img src={selectedImage ? selectedImage.image : null}></img>

            </div>
            
        </div>
    )
}
