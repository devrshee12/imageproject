import React from 'react'
import { useNavigate } from 'react-router-dom'

const SpecificImage = ({image}) => {
  const navigate = useNavigate()
  return (
    <img src={image?.src?.original} alt={image?.alt} class="img-fluid" width={200} height={200} style={{margin:"10px", cursor:"pointer"}} onClick={() => {navigate(`/image/${image?.id}`)}}/>

  )
}

export default SpecificImage