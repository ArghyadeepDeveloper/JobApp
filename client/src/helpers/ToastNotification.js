// toastNotifications.js

import { toast } from "react-toastify";

// Success Notification
export const notifySuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

// Error Notification
export const notifyError = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

// Warning Notification
export const notifyWarn = (message) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

// Info Notification
export const notifyInfo = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};
