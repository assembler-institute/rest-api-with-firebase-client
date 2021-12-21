import React, { createContext, useReducer, useContext } from "react";

import { loginWithGoogle, loginWithEmailAndPassword } from "./actions";


export const actionType = {
  REQ_LOGIN_WITH_GOOGLE: "REQ_LOGIN_WITH_GOOGLE",
  REQ_LOGIN_WITH_EMAIL: "REQ_LOGIN_WITH_EMAIL",
  ERR_LOGIN: "ERR_LOGIN",
  SUCC_LOGIN: "SUCC_LOGIN",
};

const AuthContext = createContext();

const initState = {
  currentUser: null,
  isSigningIn: false,
  signInError: null
};

function reducer(state, action) {

  switch(action.type) {
    case actionType.REQ_LOGIN_WITH_GOOGLE: {
      return {
        ...state,
        isSigningIn: true,
        signInError: null,
      }
    }
    case actionType.REQ_LOGIN_WITH_EMAIL: {
      return {
        ...state,
        isSigningIn: true,
        signInError: null,
      }
    }
    case actionType.ERR_LOGIN: {
      return {
        ...state,
        isSigningIn: false,
        signInError: action.payload,
      }
    }
    case actionType.SUCC_LOGIN: {
      return {
        ...state,
        currentUser: action.payload,
        isSigningIn: false,
      }
    }
    default: {
      return state;
    }
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const value = {
    state,
    loginWithGoogle: () =>  loginWithGoogle(dispatch),
    loginWithEmail: (data) => loginWithEmailAndPassword(data, dispatch)
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) return null;
  return context;
}

export { AuthProvider, useAuth }