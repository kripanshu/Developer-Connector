import axios from 'axios';

import {
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// delete account & profile
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure?')){
    axios.delete('/api/profile')
    .then(res => dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    })).catch(err=> dispatch({
      type: GET_ERRORS,
      payload : err.response.data
    }))
  }
}
// add experience 
export const addExperience = (expData, history) => dispatch =>{
  axios.post('/api/profile/experience', expData)
  .then(res => history.push('/dashboard'))
  .catch(err=> dispatch({
    type: GET_ERRORS,
    payload : err.response.data
  }))
}
// add education 
export const addEducation = (expData, history) => dispatch =>{
  axios.post('/api/profile/education', expData)
  .then(res => history.push('/dashboard'))
  .catch(err=> dispatch({
    type: GET_ERRORS,
    payload : err.response.data
  }))
}
// delete experience
export const deleteExperience = (id) => dispatch =>{
  axios.delete(`/api/profile/experience/${id}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload : res.data
  }))
  .catch(err=> dispatch({
    type: GET_ERRORS,
    payload : err.response.data
  }))
}

// delete education
export const deleteEducation = (id) => dispatch =>{
  axios.delete(`/api/profile/education/${id}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload : res.data
  }))
  .catch(err=> dispatch({
    type: GET_ERRORS,
    payload : err.response.data
  }))
}
// get all profiles 
export const getProfiles = () => dispatch =>{
  axios.get('/api/profile/all')
  .then(res => dispatch({
    type: GET_PROFILES,
    payload : res.data
  }))
  .catch(err=> dispatch({
    type: GET_PROFILES,
    payload :{}
  }))
}
// get profile by handle 
export const getProfileByHandle = (handle) => dispatch =>{
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload : res.data
  }))
  .catch(err=> dispatch({
    type: GET_PROFILE,
    payload : null
  }))
}
// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
