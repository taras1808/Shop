import '../../AdminPanelForm.css'


export default function SelectImagesBlock({images, setImages}) {
    return (
        <>
            <p className="admin-panel">New Images</p>

            <label className="select-image">
                Select images...
                <input type="file"
                    multiple 
                    accept="image/png, image/jpeg" 
                    onChange={e => {
                        const array = [...images]
                        Array.from(e.target.files).forEach(e => {
                            if (!images.map(e => e.name).includes(e.name)) {
                                array.push(e)
                            }
                        })
                        setImages(array)
                        e.target.value = ''
                    }} />
            </label>

            <div className="images-section">
                {
                    images.map((image, index) => (
                        <div key={index} className="image-section">
                            <p className="admin-panel">Name: 
                                <span className="close" onClick={() => {
                                    setImages(images.filter(e => e !== image))
                                }}>Remove</span>
                            </p>
                            <span>{ image.name }</span>
                            <p className="admin-panel">Size: </p>
                            <span>{(image.size / 1024).toFixed(2)} KB</span>

                            <div className="image-block">
                                <img src={URL.createObjectURL(image) } alt=""/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
