import { LOAD_DATA } from './actions';

const initialState = {
  data: []
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
