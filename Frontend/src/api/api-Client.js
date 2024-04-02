export const register = async formData => {
  const response = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const Login = async formData => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Pass the FormData object directly
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const createShop = async formData => {
  const response = await fetch("http://localhost:8000/api/shop/create", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getShop = async formData => {
  const response = await fetch("http://localhost:8000/api/shop/", {
    credentials: "include",
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}
