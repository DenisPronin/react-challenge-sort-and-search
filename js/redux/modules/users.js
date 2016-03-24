import { fromJS, List, Map } from 'immutable';
import UserApi from '../../api/usersApi'

/*
 * Constants
 * */
export const GET_USERS = 'GET_USERS';
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';
export const SEARCH_USER_BY_NAME = 'SEARCH_USER_BY_NAME';

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
        if (users.entities.size > 0) {
          dispatch(setActiveUser(users.entities.get(0).id));
        }
      })
  };
}

export function setActiveUser(userId) {
  return {type: SET_ACTIVE_USER, userId}
}

export function searchUserByName(term) {
  return {type: SEARCH_USER_BY_NAME, term}
}

export const actions = {
  getUsers,
  setActiveUser,
  searchUserByName
};

/*
 * State
 * */
export const initialState = fromJS({
  users: {},
  filterUsers: {},
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
        .set('users', action.users.entities);

    case SET_ACTIVE_USER:
      return state.set('activeUserId', action.userId);

    case SEARCH_USER_BY_NAME:
      let filterUsers = state.get('users').filter(user => {
        return user.name.toLowerCase().indexOf(action.term.toLowerCase()) > -1;
      });
      return state.set('filterUsers', filterUsers);

    default:
      return state;
  }
}

/*
* Normalize
* */
export const parseUsers = function (users) {
  let entities = new Map();
  users.forEach(user => {
    entities = entities.set(user.id, user);
  });
  return {entities};
};
