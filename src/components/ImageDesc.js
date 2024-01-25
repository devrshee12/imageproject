import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { apiSpecificImage } from '../features/image/imageActions'
import { saveAs } from 'file-saver'
import { AsyncImage } from 'loadable-image'
import { Blur } from 'transitions-kit'
import { Dropdown, DropdownButton } from 'react-bootstrap'




const ImageDesc = () => {
    const {imageId} = useParams()
    const {gettingSpecificImage, specificImage, getSpecificImageFailure} = useSelector((state) => state.image)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [size, setSize] = useState("small")
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
            if(realHistory.some((i) => i.url === image?.src?.original) === false){
                localStorage.setItem("history", JSON.stringify([...realHistory, {url:image?.src?.original, alt: image?.alt, downloadDate: Date.now()}]))

            }
        }
        saveAs(image?.src[size], "downloadedimage.jpg")
    }

    if(getSpecificImageFailure){
        return(
            <div className="alert alert-dismissible alert-danger">
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                <strong>Oh snap!</strong> <a href="#" className="alert-link"></a> {getSpecificImageFailure}
            </div>
        )
    }

  return (
    <>

    {/* {
        specificImage?.id !== imageId ? 
        <div className='container'>
            <img src={specificImage?.src?.original} width={500} height={500}/>
            <div style={{display:"flex", flexDirection:"column", height:"200px", width:"200px"}}>
                <button type="button" class="btn btn-dark" onClick={() => {handleDownload(specificImage)}}>Download</button>
                <button type="button" class="btn btn-primary" onClick={() => {navigate("/history")}}>History</button>

            </div>

        </div> : <div style={{height:"100vh", width: "100vw"}}>Loading...</div>
    } */}
        

        <div class="card mb-3" style={{width:"100vw", height:"95vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
            {/* <img src="..." class="card-img-top" alt="..."> */}
            <AsyncImage src={specificImage?.src?.original} alt={specificImage?.photographer} style={{height:"500px", width:"500px"}} className="card-img-top" Transition={Blur} error={<div style={{ background: '#222' }} />} loader={<div style={{ background: '#888' }} />}/>
            <div class="card-body">
                <h5 class="card-title">{specificImage?.photographer}</h5>
                <p class="card-text">{specificImage?.photographer}</p>
                <p class="card-text" style={{display:"flex", justifyContent:"space-between", width:"500px"}}>
                <DropdownButton title={size}>
                    <Dropdown.Item onClick={()=>{setSize("small")}}>Small</Dropdown.Item>
                    <Dropdown.Item onClick={() => {setSize("medium")}}>Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => {setSize("large")}}>Large</Dropdown.Item>
                </DropdownButton>
                <button type="button" class="btn btn-outline-info" onClick={() => {handleDownload(specificImage)}}>Download</button></p>
            </div>
        </div>
    
    </>

  )
}

export default ImageDesc