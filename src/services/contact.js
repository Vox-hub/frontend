import API from "../api";

export const sendContact = async (values) => {
  try {
    const response = await API.post("/contact/send", values);

    return response;
  } catch (err) {
    return err.response;
  }
};
