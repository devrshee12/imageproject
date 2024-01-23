import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { apiSpecificImage } from '../features/image/imageActions'
import { saveAs } from 'file-saver'


const ImageDesc = () => {
    const {imageId} = useParams()
    const {gettingSpecificImage, specificImage, getSpecificImageFailure} = useSelector((state) => state.image)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(apiSpecificImage(imageId))
    }, [])

    const handleDownload = (image) => {
        const gotHistory = localStorage.getItem("history");
        if(gotHistory === null){
            localStorage.setItem("history",JSON.stringify([{id:image.id, url:image?.src?.original, alt: image?.alt, downloadDate: Date.now()}]))
        }
        else{
            const realHistory = JSON.parse(gotHistory);
            if(realHistory.some((i) => i.id === image.id) === false){
                localStorage.setItem("history", JSON.stringify([...realHistory, {url:image?.src?.original, alt: image?.alt, downloadDate: Date.now()}]))

            }
        }
        saveAs(image?.src?.original, "downloadedimage.jpg")
    }
  return (
    <>

    {
        specificImage?.id !== imageId ? 
        <div className='container'>
            <img src={specificImage?.src?.original} width={500} height={500}/>
            <div style={{display:"flex", flexDirection:"column", height:"200px", width:"200px"}}>
                <button type="button" class="btn btn-dark" onClick={() => {handleDownload(specificImage)}}>Download</button>
                <button type="button" class="btn btn-primary" onClick={() => {navigate("/history")}}>History</button>

            </div>

        </div> : <div style={{height:"100vh", width: "100vw"}}>Loading...</div>
    }
        
    
    </>

  )
}

export default ImageDesc