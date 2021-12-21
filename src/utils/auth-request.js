import axios from "axios";
import { getCurrentUserToken, getCurrentUser } from "../services/auth";

export async function syncUserData() {
  const userToken = await getCurrentUserToken();
  const user = await getCurrentUser();
  // process.env.REACT_APP_API_BASE_URL
  // http://localhost:4000

  return axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/account/sign-in`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    data: user
  });
}
