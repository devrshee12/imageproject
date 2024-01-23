
import { useEffect, useState } from 'react';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { getImages } from './features/image/imageActions';
import SpecificImage from './components/SpecificImage';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("dog");
  const {gettingImages, images, getImageFailure, total_pages} = useSelector((state) => state.image);
  const navigate = useNavigate()
  const handleHistory = () => {
    navigate("/history")
  } 
  useEffect(() => {
    dispatch(getImages());

  }, [])

  useEffect(() => {
    
    const timer = setTimeout(() => {
      dispatch(getImages(search))
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

 

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Imagia</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <form className="d-flex">
              <input className="form-control me-sm-2" type="search" placeholder="Search" style={{color:"black"}} value={search} onChange={(e) => {setSearch(e.target.value)}}/>
              {/* <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button> */}
            </form>
          </div>
        </div>
        <button type="button" class="btn btn-outline-info" onClick={handleHistory}>Downloads</button>
      </nav>

      {
        images?.length === 0 && <div> NO DATA</div>
      }

      <div className='container-fluid'>
        {
          images ? images.map((image) => {
            return (
              <SpecificImage image={image}/>
            )
          }) : <div>Loading...</div>
        }
    </div>

    
    </>
  );
}

export default App;
