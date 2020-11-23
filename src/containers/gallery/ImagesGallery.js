import React, { useState, useEffect, useRef } from 'react'
import './ImagesGallery.css'


export default function ImagesGallery ({ images }) {

    const [selectedImage, setSelectedImage] = useState(null)

    const [offset, setOffset] = useState(0)

    useEffect(() => {
        if (images) setSelectedImage(images[0])
    }, [images])

    return (
        <div className="images-gallery-block">

            <div className="images-gallery-thumbnails-block">

                <div style={{transform: "translateY(" + (-offset) + "px)", transition: 'transform .3s'}}>

                    {
                        images ? images.map((image, index) => (
                            <div key={index} className="images-gallery-thumbnail" onClick={_ => {
                                setSelectedImage(images[index])
                                if (images.length <= 4) return
                                if (index > 2 && index < images.length - 3)
                                    setOffset(index * 95 - 205)
                                if (index <= 2)
                                    setOffset(index * 0)
                                if (index >= images.length - 3)
                                    setOffset((images.length - 3) * 95 - 220)
                            }}>

                                <img src={image.image}></img>
            
                            </div>
                        )) : null
                    }

                </div>

            </div>

            <div className="images-gallery-image-block">

                <img src={selectedImage ? selectedImage.image : null}></img>

            </div>
            
        </div>
    )
}
