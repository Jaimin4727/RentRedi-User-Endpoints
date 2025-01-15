import { getUsersAPI, getUserByIdAPI, createUserAPI, updateUserAPI, deleteUserByIdAPI } from '../../apis/index'
import { setUserSlice } from '../slice/user'
import { addUserSlice, deleteUserSlice, editUserSlice, getUsersSlice, failureSlice, setLoader } from '../slice/users'
import { CREATE_USER, DELETE_USER_BY_ID, GET_USERS, GET_USER_BY_ID, UPDATE_USER_BY_ID, FAILURE } from '../types'
import { put, takeEvery } from 'redux-saga/effects'

export function* getUsersSaga() {
    const users = yield getUsersAPI()
    yield put(getUsersSlice(users.data))
}

export function* getUserByIdSaga(action) {
    yield getUserByIdAPI(action.id)
    yield put(setUserSlice(action.id))
}

export function* createUserSaga(action) {
    try {
        yield put(setLoader(true))
        yield createUserAPI(action.user)
        yield put({ type: GET_USERS })
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        yield put(failureSlice(error.response.data.details || error));
    }
}

export function* updateUserSaga(action) {
    try {
        yield put(setLoader(true))
        yield updateUserAPI(action.user)
        yield put(editUserSlice(action.user))
        yield put(setLoader(false))
    } catch (error) {
        yield put(setLoader(false))
        yield put(failureSlice(error.response.data.details || error));
    }
}

export function* deleteUserByIdSaga(action) {
    try {
        yield deleteUserByIdAPI(action.id)
        yield put(deleteUserSlice(action.id))
    } catch (error) {
        yield put(setLoader(false))
        yield put(failureSlice(error.response.data.details || error))
    }
}

export function* watchUsersAsync() {
    yield takeEvery(GET_USERS, getUsersSaga)
    yield takeEvery(GET_USER_BY_ID, getUserByIdSaga)
    yield takeEvery(CREATE_USER, createUserSaga)
    yield takeEvery(UPDATE_USER_BY_ID, updateUserSaga)
    yield takeEvery(DELETE_USER_BY_ID, deleteUserByIdSaga)
}