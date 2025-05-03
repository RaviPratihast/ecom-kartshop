function authenticationReducer(stateAuth, actionAuth) {
  switch (actionAuth.type) {
    case "USER_LOGGED_IN":
      return {
        ...stateAuth,
        loggedIn: true,
        isGuestUser: false,
      };
    case "GUEST_USER_LOGGED_IN":
      return {
        ...stateAuth,
        loggedIn: true,
        isGuestUser: true,
      };
    case "USER_LOGOUT":
      return {
        ...stateAuth,
        loggedIn: false,
        isGuestUser: false,
      };
    case "SIGN_IN":
      return {
        ...stateAuth,
        users: [...stateAuth.users, actionAuth.payload],
      };
    default:
      return stateAuth;
  }
}

export default authenticationReducer;
