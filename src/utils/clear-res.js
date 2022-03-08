export const internalServerError = (err) => {
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: false,
    errorMessage: "Internal Server Error, Please check your server",
  };
};

export const successStatus = (res) => {
  return {
    status: true,
    data: res.data,
    statusCode: res.status,
  };
};
