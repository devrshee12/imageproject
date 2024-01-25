
import { useEffect, useState } from 'react';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { getImages } from './features/image/imageActions';
import SpecificImage from './components/SpecificImage';
import { useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  const dispatch = useDispatch();

  const {gettingImages, images, getImageFailure, total_pages, search} = useSelector((state) => state.image);
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(getImages());

  }, [])

  useEffect(() => {
    console.log("called when search value is : ", search);
    if(search !== ""){
      dispatch(getImages(search))
    }
  }, [search])

  if(getImageFailure){
    return(
      <div class="alert alert-dismissible alert-danger">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Oh snap!</strong> <a href="#" class="alert-link"></a> {getImageFailure}
      </div>
    )
  }

  

 

  return (
    <>
      <NavBar/>
      {
        images?.length === 0 && <div style={{width:"100vw", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px", fontSize:"50px"}}>No Data</div>
      }

      {
        gettingImages ? <div style={{width:"100vw", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px"}}><div class="spinner-border text-info" role="status" >
        <span class="sr-only"></span>
      </div>
      </div>
        :
        <div class="row row-cols-1 row-cols-md-3" style={{marginLeft:"70px"}}>
        {
          images.map((image) => {
            return (
              <SpecificImage image={image}/>
            )
          })
        }
    </div>
        }

    
    </>
  );
}

export default App;
