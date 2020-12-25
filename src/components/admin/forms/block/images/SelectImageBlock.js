import '../../AdminPanelForm.css'


export default function SelectImageBlock({image, setImage}) {
    return (
        <>
            <p className="admin-panel">Image</p>

            <label className="select-image">
                Select image...
                <input type="file"
                    accept="image/png, image/jpeg" 
                    onChange={e => {
                        setImage(e.target.files[0])
                        e.target.value = ''
                    }} />
            </label>

            {
                image ? (
                    <div className="images-section">
                        <div className="image-section">

                            <p className="admin-panel">Name:
                                <span className="close" onClick={() => {
                                    setImage(null)
                                }}>Remove</span>
                            </p>
                            <span>{image.name} </span>

                            <p className="admin-panel">Size:</p>
                            <span>{(image.size / 1024).toFixed(2)} KB</span>

                            <div className="image-block">
                                <img src={URL.createObjectURL(image) } alt=""/>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}
