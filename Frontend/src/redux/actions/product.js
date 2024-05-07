export const getAllProducts = () => async dispatch => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    })

    const response = await fetch("http://localhost:8000/api/products")

    const data = await response.json()
    console.log(data)

    dispatch({
      type: "getAllProductsSuccess",
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    })
  }
}
