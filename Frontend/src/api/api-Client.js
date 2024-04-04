export const register = async (formData) => {
  const response = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  });

  const responseBody = await response.json();
  console.log(response);

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const Login = async (formData) => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Pass the FormData object directly
  });

  const responseBody = await response.json();
  console.log(response);

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const createShop = async (formData) => {
  const response = await fetch("http://localhost:8000/api/shop/create", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  });

  const responseBody = await response.json();
  console.log(response);

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const getShop = async (shopId) => {
  const response = await fetch("http://localhost:8000/api/shop/" + shopId, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  const responseBody = await response.json();
  console.log(responseBody);

  return responseBody;
};

export const checkout = async (cartItems, customer) => {
  console.log("here" + cartItems);
  const response = await fetch("http://localhost:8000/api/user/checkout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItems, customer }),
  });

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  const responseBody = await response.json();
  console.log(responseBody);

  return responseBody;
};
