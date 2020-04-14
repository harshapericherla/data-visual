import { YEAR_CLICKED, EMPLOYMENT_CLICKED, PROVINCE_CLICKED } from "../actions/types";

export default function(state = null,action){
    switch(action.type){
        case YEAR_CLICKED:
            return {...state,[YEAR_CLICKED]:action.payload};
        case EMPLOYMENT_CLICKED:
            return {...state,[EMPLOYMENT_CLICKED]:action.payload};
        case PROVINCE_CLICKED:
            return {...state,[PROVINCE_CLICKED]:action.payload};
        default: 
          return state;
    }
}