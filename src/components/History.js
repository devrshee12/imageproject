import React, { useEffect, useState } from 'react'
import SpecificImage from './SpecificImage';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const [downloadedImages, setDownloadedImages] = useState([]);
    const navigate = useNavigate();

    const getDownloadedImages = () => {
        if(localStorage.getItem("history")){
            setDownloadedImages(JSON.parse(localStorage.getItem("history")))
        }
    }
    useEffect(() => {
        getDownloadedImages();
    }, [])

    if(downloadedImages?.length === 0){
        return (
            <div>
                NO DATA
            </div>
        )
    }

  return (
    <div className='container-fluid'>
        <h1>Downloads</h1>
        {
          downloadedImages ? downloadedImages.map((image) => {
            return (
                <img src={image?.url} alt={image?.alt} class="img-fluid" width={200} height={200} style={{margin:"10px", cursor:"pointer"}}/>
            )
          }) : <div>Loading...</div>
        }
        <div>
        <button type="button" class="btn btn-outline-primary" onClick={() => {navigate("/")}}>Go to Main Page</button>

        </div>
    </div>
  )
}

export default History