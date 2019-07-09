// Basically, this is one flow, redux catches

// 1. cancel prev, exec this action
// 2. call
import { takeLatest, call, put } from "redux-saga/effects";
// api
import axios from "axios";

// listen to action, callback func handles result
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// api call and return promise
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

function* workerSaga() {
  try {
    // 1. similar to async await
    // 2. yeild === await, call(promise)
    // 3. call(func_name, param)
    const response = yield call(fetchDog);
    // msg
    const dog = response.data.message;

    // await dispatch action + data
    yield put({ type: "API_CALL_SUCCESS", dog });
  
  } catch (error) {
    // await dispatch action + error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}