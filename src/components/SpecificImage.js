import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { AsyncImage } from 'loadable-image'
import { Blur, Fade, Grow, Collapse} from 'transitions-kit'

const SpecificImage = ({image}) => {
  const navigate = useNavigate()
  return (
    <>

    <div className="col mb-4" style={{width:"350px", cursor:"pointer"}} onClick={() => {navigate(`/image/${image?.id}`)}}>
    <div className="card" style={{ width: "300px"}}>
      {/* <img src="..." className="card-img-top" alt="..."> */}
      {/* <LazyLoadImage effect="blur" src={image?.src?.original} alt={image?.alt} height={250} width={250} className="card-img-top"  onLoad={() => {setLoading(true)}} placeholderSrc={`/logo512.png`}/> */}
      <AsyncImage src={image?.src?.original} alt={image?.alt} style={{height:"250px", width:"250px"}} className="card-img-top" Transition={Blur} error={<div style={{ background: '#222' }} />}/>
      <div className="card-body">
        <h5 className="card-title">{image?.photographer}</h5>
        <p className="card-text">{image?.alt}</p>
      </div>
    </div>
  </div>
    
    
    </>

  )
}

export default SpecificImage