interface ReduxUserState {
  user: {
    userLoggedIn: boolean;
    uid: string;
    userName: string;
  };
}

export { ReduxUserState }