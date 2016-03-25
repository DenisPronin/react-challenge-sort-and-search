import { fromJS, Map } from 'immutable';
import UserApi from '../../api/usersApi'

/*
 * Constants
 * */
export const GET_USERS = 'GET_USERS';
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';
export const SEARCH_USER_BY_NAME = 'SEARCH_USER_BY_NAME';
export const ORDER_BY = 'ORDER_BY';
export const ASC = 'ASC';
export const DESC = 'DESC';

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
        dispatch(setActiveUser());
      })
  };
}

export function setActiveUser(userId) {
  return {type: SET_ACTIVE_USER, userId}
}

export function searchUserByName(term) {
  return {type: SEARCH_USER_BY_NAME, term}
}

export function searchUserAndActivate(term) {
  return dispatch => {
    dispatch(searchUserByName(term));
    dispatch(setActiveUser());
  }
}

export function orderBy(field, orderType) {
  return {type: ORDER_BY, payload: {field, orderType}}
}

export function orderAndActivate(field, orderType) {
  return dispatch => {
    dispatch(orderBy(field, orderType));
    dispatch(setActiveUser());
  }
}

export const actions = {
  getUsers,
  setActiveUser,
  searchUserByName,
  searchUserAndActivate,
  orderAndActivate,
  orderBy
};

/*
 * State
 * */
export const initialState = fromJS({
  users: {},
  filterUsers: {},
  searchTerm: '',
  activeUserId: null,
  orderBy: {
    name: DESC,
    age: DESC
  },
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
      let id = action.userId;
      if (!id) {
        let collectionField = state.get('searchTerm') ? 'filterUsers' : 'users';
        id = state.get(collectionField).first().id;
      }
      return state.set('activeUserId', id);

    case SEARCH_USER_BY_NAME:
      let filterUsers = state.get('users').filter(user => {
        return user.name.toLowerCase().indexOf(action.term.toLowerCase()) > -1;
      });
      return state
        .set('filterUsers', filterUsers)
        .set('searchTerm', action.term);

    case ORDER_BY:
      let orderField = action.payload.field;
      let orderType = action.payload.orderType;
      let collectionField = state.get('searchTerm') ? 'filterUsers' : 'users';

      let users = state.get(collectionField).sortBy(user => user[orderField]);
      if (orderType === DESC) {
        users = users.reverse();
      }
      return state
        .set(collectionField, users)
        .setIn(['orderBy', orderField], orderType);

    default:
      return state;
  }
}

export const parseUsers = function (users) {
  let entities = new Map();
  users.forEach(user => {
    entities = entities.set(user.id, user);
  });
  return {entities};
};
