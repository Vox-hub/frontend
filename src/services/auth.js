export const loginWithGoogle = () => {
  window.open(`${process.env.REACT_APP_API_URL}/user/google/callback`, "_self");
};

export const loginWithGithub = () => {
  window.open(`${process.env.REACT_APP_API_URL}/user/github/callback`, "_self");
};

export const logout = () => {
  window.localStorage.setItem("token", "");
  window.location.href = "/home";
};
