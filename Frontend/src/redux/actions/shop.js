// get all sellers --- admin
import { useSelector } from "react-redux" // This line should be removed, explanation below
import * as apiClient from "../../api/api-Client" // Assuming this is the correct path to your API client
export const getShopDetails = shopId => async dispatch => {
  try {
    dispatch({
      type: "LoadShopDetails",
    })

    const data = await apiClient.getShop(shopId)
    console.log(data)
    dispatch({
      type: "getShopDetailsSuccess",
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: "getShopDetailsFailed",
      //   payload: error.response.data.message,
    })
  }
}
