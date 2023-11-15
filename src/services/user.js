import API from "../api";

export const updateUser = async (id, data) => {
  try {
    const response = await API.patch(`/user/${id}`, data);

    localStorage.setItem("token", response.data.token);
    return response;
  } catch (err) {
    return err;
  }
};
