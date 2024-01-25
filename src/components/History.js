import React, { useEffect, useState } from 'react'
import SpecificImage from './SpecificImage';
import { useNavigate } from 'react-router-dom';
import { AsyncImage } from 'loadable-image';
import { Blur } from 'transitions-kit';

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

    useEffect(() => {
        
    }, [])

    

  return (
    // <div className='container-fluid'>
    //     <h1>Downloads</h1>
    //     {
    //       downloadedImages ? downloadedImages.map((image) => {
    //         return (
    //             <img src={image?.url} alt={image?.alt} class="img-fluid" width={200} height={200} style={{margin:"10px", cursor:"pointer"}}/>
    //         )
    //       }) : <div>Loading...</div>
    //     }
    //     <div>
    //     <button type="button" class="btn btn-outline-primary" onClick={() => {navigate("/")}}>Go to Main Page</button>

    //     </div>
    // </div>

    <>
        <h1>Downloads</h1>
        {
            downloadedImages?.length === 0 && <div style={{width:"100vw", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px", fontSize:"50px"}}>No Data</div>
        }

        {
            !downloadedImages ? <div style={{width:"100vw", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px"}}><div class="spinner-border text-info" role="status" >
            <span class="sr-only"></span>
        </div>
        </div>
            :
            <div class="row row-cols-1 row-cols-md-3" style={{marginLeft:"70px"}}>
            {
            downloadedImages.map((image) => {
                return (
                    <div className="col mb-4" style={{width:"350px", cursor:"pointer"}} onClick={() => {navigate(`/image/${image?.id}`)}}>
                    <div className="card" style={{ width: "300px"}}>
                      {/* <img src="..." className="card-img-top" alt="..."> */}
                      {/* <LazyLoadImage effect="blur" src={image?.src?.original} alt={image?.alt} height={250} width={250} className="card-img-top"  onLoad={() => {setLoading(true)}} placeholderSrc={`/logo512.png`}/> */}
                      <AsyncImage src={image?.url} alt={image?.alt} style={{height:"250px", width:"250px"}} className="card-img-top" Transition={Blur} error={<div style={{ background: '#222' }} />}/>
                      <div className="card-body">
                        {/* <h5 className="card-title">{image?.photographer}</h5> */}
                        <p className="card-text">{image?.alt}</p>
                      </div>
                    </div>
                  </div>
                )
            })
            }
        </div>
            }
            <button type="button" className="btn btn-outline-dark" onClick={() => {navigate("/")}}>Go Back to Home page</button>
    </>

  )
}

export default History