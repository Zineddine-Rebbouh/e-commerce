export const LoadUser = () => async dispatch => {
  try {
    dispatch({
      type: "LoadUserRequest",
    })

    const res = await fetch("http://localhost:8000/api/user/", {
      method: "GET",
      credentials: "include",
    })

    console.log(res)
    const data = await res.json()
    console.log(data)
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
