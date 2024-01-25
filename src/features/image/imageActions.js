import axios from "axios"
import { GET_IMAGE_FAILURE, GET_IMAGE_REQUEST, GET_IMAGE_SUCCESS, GET_SPECIFIC_IMAGE_FAILURE, GET_SPECIFIC_IMAGE_REQUEST, GET_SPECIFIC_IMAGE_SUCCESS, SET_SEARCH } from "./imageTypes"


export const getImageRequest = () => {
    return {
        type: GET_IMAGE_REQUEST
    }
}


export const getImageSuccess = (images) => {
    return {
        type: GET_IMAGE_SUCCESS,
        payload: images
    }
}

export const getImageFailure = (err) => {
    return {
        type: GET_IMAGE_FAILURE,
        getImageFailure: err.message
    }
}


export const getSpecificImageRequest = () => {
    return {
        type: GET_SPECIFIC_IMAGE_REQUEST
    }
}


export const getSpecificImage = (image) => {
    return {
        type: GET_SPECIFIC_IMAGE_SUCCESS,
        payload: image
    }
}


export const getSpecificImageFailure = (err) => {
    return {
        type: GET_SPECIFIC_IMAGE_FAILURE,
        payload: err.message
    }
}


export const setSearch = (val) => {
    console.log("called set search", val)
    return {
        type: SET_SEARCH,
        payload: val
    }

}



export const getImages = (search="dog", page=1, per_page=18) => {
    return async(dispatch) => {
        try{
            dispatch(getImageRequest());
            let newSearch = search;
            if(newSearch === ""){
                newSearch = "dog"
            }
            console.log("newSearch : ", newSearch);
            const res = await axios.get(`${process.env.REACT_APP_PEXEL_API}/search?query=${newSearch}&page=${page}&per_page=${per_page}&orientation=square`, {
                headers: {
                    Authorization: `${process.env.REACT_APP_PEXEL_API_KEY}`
                }
            });
            dispatch(getImageSuccess(res?.data));

            console.log(res?.data)

        }
        catch(err){
            dispatch(getImageFailure(err));
            console.log(err)
        }
    }
}



export const apiSpecificImage = (id) => {
    return async(dispatch) => {
        try{
            dispatch(getSpecificImageRequest());
            const res = await axios.get(`${process.env.REACT_APP_PEXEL_API}/photos/${id}`, {
                headers: {
                    Authorization: `${process.env.REACT_APP_PEXEL_API_KEY}`
                }
            })

            dispatch(getSpecificImage(res?.data))
        }
        catch(err){
            dispatch(getSpecificImageFailure(err))
            console.log(err);
        }

    }
    
}