import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../features/image/imageActions';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const dispatch = useDispatch();
    const {search} = useSelector((state) => state.image)
    const searchRef = useRef(null);
    const navigate = useNavigate(); 
    // useEffect(() => {
    //     console.log("Search value is : ", search)
    // }, [search])

    const handleDownloadClick = () => {
        navigate("/history")
    }

    const onSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchRef.current.value))
    }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm" style={{display:"flex", justifyContent:"space-between"}}>
  <a className="navbar-brand" href="#" style={{marginLeft:"20px"}}>
    IMAGIA
  </a>
  <form className="form-inline" style={{display:"flex"}}>
    <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" ref={searchRef} onKeyDown={(e) => {
        if(e.key === "Enter"){
            onSearch(e);
        }
    }}/>
    <button className="btn btn-info" onClick={(e) => {
        onSearch(e);
    
    }}><FaSearch /></button>
  </form>
  <button type="button" class="btn btn-outline-info" style={{marginRight:"20px"}} onClick={handleDownloadClick}>Downloads</button>
</nav>
  )
}

export default NavBar