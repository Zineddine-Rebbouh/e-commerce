export const LoadUser = () => async dispatch => {
  try {
    dispatch({
      type: "LoadUserRequest",
    })

    const res = await fetch("http://localhost:8000/api/user/currentUser", {
      method: "GET",
      credentials: "include",
    })
    const data = await res.json()
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    })
  }
}
