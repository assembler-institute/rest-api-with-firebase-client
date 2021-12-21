import { actionType } from "./reducer";

import { syncUserData } from "../../utils/auth-request";
import {
  signInWithGoogle,
  signInWithEmailAndPassword,
} from "../../services/auth";

export async function loginWithGoogle(dispatch) {
  dispatch({ type: actionType.REQ_LOGIN_WITH_GOOGLE});
  try {
    const res = await signInWithGoogle();
    console.log(res.user)
    await syncUserData();
    dispatch({ type: actionType.SUCC_LOGIN, payload: res.user});
  } catch(err) {
    dispatch({ type: actionType.ERR_LOGIN, payload: err});
  }
}

export async function loginWithEmailAndPassword({email, password}, dispatch) {
  dispatch({ type: actionType.REQ_LOGIN_WITH_EMAIL});
  try {
    const res = await signInWithEmailAndPassword(email, password);
    console.log(res.user)
    await syncUserData();
    dispatch({ type: actionType.SUCC_LOGIN, payload: res.user});
  } catch(err) {
    dispatch({ type: actionType.ERR_LOGIN, payload: err});
  }
}