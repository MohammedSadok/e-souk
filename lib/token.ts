// Set the authentication token in localStorage or a secure storage solution
export const setToken = (token: string) => {
  // Use localStorage as an example. You can replace this with your preferred storage solution.
  localStorage.setItem("token", token);
};

// Remove the authentication token from localStorage or a secure storage solution
export const removeToken = () => {
  // Use localStorage as an example. You can replace this with your preferred storage solution.
  localStorage.removeItem("token");
};
