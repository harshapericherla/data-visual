import {YEAR_CLICKED, EMPLOYMENT_CLICKED, PROVINCE_CLICKED} from './types';

export const yearClicked = (year) => dispatch => {
   
     dispatch({type:YEAR_CLICKED,payload:year})
}

export const employmentClicked = (empType) => dispatch => {
     dispatch({type:EMPLOYMENT_CLICKED,payload:empType})
}


export const provinceClicked = (province) => dispatch => {
     dispatch({type:PROVINCE_CLICKED,payload:province})
}