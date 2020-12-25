import '../../AdminPanelForm.css'


export default function OldImageBlock({oldImage, setOldImage}) {
    return (
        <>
            <p className="admin-panel">Old Image</p>
            {
                oldImage ? (
                    <div className="images-section">
                        <div className="image-section">
                            <p className="admin-panel">
                                <span className="close" onClick={() => {
                                    setOldImage(null)
                                }}>Remove</span>
                            </p>

                            <div className="image-block">
                                <img src={oldImage} alt=""/>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}
