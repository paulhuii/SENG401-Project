import { GLOBALTYPES} from './globalTypes'
// import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
// import { imageUpload } from '../../utils/imageUpload'
// import { createNotify, removeNotify } from '../actions/notifyAction'

export const PROFILE_TYPES = {
    LOADING: 'LOADING_PROFILE',
    GET_USER: 'GET_PROFILE_USER',
    UPDATE_POST: 'UPDATE_PROFILE_POST'
}


// export const getProfileUsers = ({id, auth}) => async (dispatch) => {
//     dispatch({type: PROFILE_TYPES.GET_ID, payload: id})

//     try {
//         dispatch({type: PROFILE_TYPES.LOADING, payload: true})
//         const res = getDataAPI(`/user/${id}`, auth.token)
//         const res1 = getDataAPI(`/user_posts/${id}`, auth.token)
        
//         const users = await res;
//         const posts = await res1;

//         dispatch({
//             type: PROFILE_TYPES.GET_USER,
//             payload: users.data
//         })

//         dispatch({
//             type: PROFILE_TYPES.GET_POSTS,
//             payload: {...posts.data, _id: id, page: 2}
//         })

//         dispatch({type: PROFILE_TYPES.LOADING, payload: false})
//     } catch (err) {
//         dispatch({
//             type: GLOBALTYPES.ALERT, 
//             payload: {error: err.response.data.msg}
//         })
//     }
    
// }


export const updateProfileUser = ({userData, avatar, auth}) => async (dispatch) => {
    if(!userData.name)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please add your full name."}})

    if(userData.name.length > 25)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your full name too long."}})

    if(userData.story.length > 200)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your story too long."}})
}

