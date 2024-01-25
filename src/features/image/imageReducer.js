import { GET_IMAGE_FAILURE, GET_IMAGE_REQUEST, GET_IMAGE_SUCCESS, GET_SPECIFIC_IMAGE_FAILURE, GET_SPECIFIC_IMAGE_REQUEST, GET_SPECIFIC_IMAGE_SUCCESS, SET_SEARCH } from "./imageTypes"


const initalState = {

    // image states
    gettingImages: false,
    images: [],
    getImageFailure: null,
    page: 1,
    per_page: 18,
    total_results: 18,
    total_pages: 1,


    // specific image
    gettingSpecificImage: false,
    specificImage: {},
    getSpecificImageFailure: null,


    // search

    search:""


}


const imageReducer = (state = initalState, action) => {
    switch(action.type){
        case GET_IMAGE_REQUEST:
            return {
                ...state,
                gettingImages: true,
                getImageFailure: null,
            }

        case GET_IMAGE_SUCCESS:
            return {
                ...state, 
                gettingImages: false,
                getImageFailure: null,
                images: action?.payload?.photos,
                page: action?.payload?.page,
                per_page: action?.payload?.per_page,
                total_results: action?.payload?.total_results,
                total_pages: action?.payload?.total_results/action?.payload?.per_page


            }
        
        case GET_IMAGE_FAILURE:
            return {
                ...state,
                gettingImages: false,
                getImageFailure: action?.payload,
            }

        case GET_SPECIFIC_IMAGE_REQUEST:
            return {
                ...state, 
                gettingSpecificImage: true,
                getSpecificImageFailure: null

            }
        case GET_SPECIFIC_IMAGE_SUCCESS:
            return {
                ...state, 
                gettingSpecificImage: false,
                specificImage: action?.payload
            }
        case GET_SPECIFIC_IMAGE_FAILURE:
            return {
                ...state, 
                gettingSpecificImage:false,
                getSpecificImageFailure: action?.payload
            }
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload
            }
        default:
            return state
    }
}



export default imageReducer