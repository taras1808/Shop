import '../../AdminPanelForm.css'


export default ({oldImages, setOldImages}) => {
    return (
        <>
            <p className="admin-panel">Old Images</p>
            <div className="images-section">
                {
                    oldImages.map((image, index) => (
                        <div key={index} className="image-section">
                            <p className="admin-panel">
                                <span className="close" onClick={() => {
                                    setOldImages(oldImages.filter(e => e !== image))
                                }}>Remove</span>
                            </p>
                            
                            <div className="image-block">
                                <img src={image.image} alt=""/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
