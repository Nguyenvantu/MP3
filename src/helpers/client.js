import axios from "axios";
// import { getToken } from "./utility";
import { loadUserData } from "../helpers/localStorage";
import { notification } from "antd";
// import authActions from "../redux/auth/actions";
// import { store } from "../redux/store";

export default function(noShowNotification) {
  const userData = loadUserData();
  const token = userData && userData.access_token;
  const defaultOptions = token
    ? {
        headers: {
          Authorization: token
        }
      }
    : {};

  return {
    get: (url, options = {}) =>
      axios
        .get(url, { ...defaultOptions, ...options })
        .then(({ data }) => {
          return checkResponse(data, noShowNotification);
        })
        .catch(err => {
          return handleError(err, noShowNotification);
        }),
    post: (url, data, options = {}) =>
      axios
        .post(url, data, { ...defaultOptions, ...options })
        .then(({ data }) => {
          return checkResponse(data, noShowNotification);
        })
        .catch(err => {
          return handleError(err, noShowNotification);
        }),
    put: (url, data, options = {}) =>
      axios
        .put(url, data, { ...defaultOptions, ...options })
        .then(({ data }) => {
          return checkResponse(data, noShowNotification);
        })
        .catch(err => {
          return handleError(err, noShowNotification);
        }),
    delete: (url, options = {}) =>
      axios
        .delete(url, { ...defaultOptions, ...options })
        .then(({ data }) => {
          return checkResponse(data, noShowNotification);
        })
        .catch(err => {
          return handleError(err, noShowNotification);
        })
  };
}

function checkResponse(data, noShowNotification) {
  if (data.error_code === -1 || typeof data.error_code === "undefined") {
    // notification("warning", "Phiên làm việc đã hết hạn.");
    // store.dispatch(authActions.logout());
  } else if (data.error_code !== 0) {
    !noShowNotification && notification.error({ message: data.error_msg.toString() });
  }
  return data;
}

function handleError(error, noShowNotification) {
  if (!noShowNotification) {
    if (error.response) {
      notification.error({
        message: "Lỗi!",
        description:
          (error.response.data && error.response.data.message) ||
          error.response.statusText
      });
    } else {
      notification.error({
        message: "Lỗi!",
        description: "Không thể kết nối tới máy chủ."
      });
    }
  }
  return error;
}
