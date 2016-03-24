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
        users = parseUsers(users);
        dispatch(getUsersFullfilled(users));
      });

  };
}

export const actions = {
  getUsers
};

/*
 * State
 * */
export const initialState = fromJS({
  userIds: [],
  users: {},
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
