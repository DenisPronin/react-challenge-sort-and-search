// get users
// set active use
// search user
// sort by name
// sort by age
import { fromJS } from 'immutable';
import UserApi from '../../api/usersApi'

/*
 * Constants
 * */
export const GET_USERS = 'GET_USERS';
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';

/*
 * Actions
 * */
export function getUsersPending() {
  return {type: GET_USERS + '_PENDING'}
}

export function getUsersRejected(error) {
  return {type: GET_USERS + '_REJECTED', error}
}

export function getUsersFullfilled(users) {
  return {type: GET_USERS + '_FULFILLED', users}
}

export function getUsers() {
  return dispatch => {
    dispatch(getUsersPending());
    UserApi.getUsers()
      .then(users => {
        return parseUsers(users);
      })
      .then(users => {
        dispatch(getUsersFullfilled(users));
        if (users.ids.length > 0) {
          dispatch(setActiveUser(users.entities[0].id));
        }
      })
  };
}

export function setActiveUser(userId) {
  return {type: SET_ACTIVE_USER, userId}
}

export const actions = {
  getUsers,
  setActiveUser
};

/*
 * State
 * */
export const initialState = fromJS({
  userIds: [],
  users: {},
  activeUserId: null,
  isGetPending: false,
  errorMessage: ''
});

export default function users(state = initialState, action) {
  switch (action.type) {
    case `${GET_USERS}_PENDING`:
      return state.set('isGetPending', true);

    case `${GET_USERS}_REJECTED`:
      return state
        .set('isGetPending', false)
        .set('errorMessage', action.error);

    case `${GET_USERS}_FULFILLED`:
      return state
        .set('isGetPending', false)
        .set('userIds', action.users.ids)
        .set('users', action.users.entities);

    case SET_ACTIVE_USER:
      return state.set('activeUserId', action.userId);

    default:
      return state;
  }
}

/*
* Normalize
* */
export const parseUsers = function (users) {
  let ids = [];
  let entities = {};
  users.forEach(user => {
    ids.push(user.id.toString());
    entities[user.id] = user;
  });
  return {ids, entities};
};
