import { useEffect, useState } from "react";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { getImages, getMoreImages } from "./features/image/imageActions";
import SpecificImage from "./components/SpecificImage";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import InfiniteScroll from "react-infinite-scroll-component";


function App() {
  const dispatch = useDispatch();

  const {
    gettingImages,
    images,
    getImageFailure,
    total_pages,
    search,
    total_results,
  } = useSelector((state) => state.image);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getImages());
  }, []);

  useEffect(() => {
    console.log("this is called again search useeffect : ", search);
    if (search !== "") {
      dispatch(getImages(search));
    }
  }, [search]);

  if (getImageFailure) {
    return (
      <div class="alert alert-dismissible alert-danger">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
        ></button>
        <strong>Oh snap!</strong> <a href="#" class="alert-link"></a>{" "}
        {getImageFailure}
      </div>
    );
  }

  const fetchMoreData = () => {
    const pageNo = Math.ceil(images.length / 18) + 1;
    dispatch(getMoreImages(search, pageNo, 18));
  };

  return (
    <>
      <NavBar />
      {images?.length === 0 && (
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            fontSize: "50px",
          }}
        >
          No Data
        </div>
      )}

      {/* {
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
        } */}
      {gettingImages && (
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <div class="spinner-border text-info" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      )}

      <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreData}
        hasMore={images.length < total_results}
        loader={<h4>Loading...</h4>}
        // inverse={true}
        
      >
        <div>
          {
            //   gettingImages ? <div style={{width:"100vw", display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px"}}><div class="spinner-border text-info" role="status" >
            //   <span class="sr-only"></span>
            // </div>
            // </div>
            //   :
            <div
              class="row row-cols-1 row-cols-md-3"
              style={{ marginLeft: "70px" }}
            >
              {images.map((image) => {
                return <SpecificImage image={image} />;
              })}
            </div>
          }
        </div>
      </InfiniteScroll>

{/* <ImageContainer/> */}
    </>
  );
}

export default App;
