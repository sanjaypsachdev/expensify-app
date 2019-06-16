import { firebase, googleAuthProvider, githubAuthProvider } from '../firebase/firebase';

export const authProviders = {
  GOOGLE: 'google',
  GITHUB: 'github'
}

export const login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export const startLogin = (authProvider) => {
  return () => {
    switch (authProvider) {
      case authProviders.GITHUB:
        return firebase.auth().signInWithPopup(githubAuthProvider);
      case authProviders.GOOGLE:
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
    
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
};

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};