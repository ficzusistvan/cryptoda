import {
  SET_TEST
} from "../actions/types";

const testConfigs = (state = {}, action) => {
  switch (action.type) {
    case SET_TEST:
      return state;
    default:
      return state;
  }
}

export default testConfigs