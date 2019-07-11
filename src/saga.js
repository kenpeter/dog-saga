// Basically, this is one flow, redux catches

// 1. cancel prev, exec this action
// 2. call
import { takeLatest, call, put } from "redux-saga/effects";
// api
import axios from "axios";

// 1. generator
// 2. 1 flow action
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// promise
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

function* workerSaga() {
  try {
    // 1. wait promise, result
    const response = yield call(fetchDog);
    // msg
    const dog = response.data.message;

    // dispatch ui change
    yield put({ type: "API_CALL_SUCCESS", dog });
  
  } catch (error) {
    // dispatch ui change
    yield put({ type: "API_CALL_FAILURE", error });
  }
}