const successResponse = (res, msg) => {
    const data = {
      status: 1,
      message: msg,
    };
    return res.status(200).json(data);
  };
  
  const successResponseWithData = (res, msg, data) => {
    const resData = {
      status: 1,
      message: msg,
      data: data,
    };
    return res.status(200).json(resData);
  };
  
  const duplicationErrorWithData = (res, msg, data) => {
    const resData = {
      status: 0,
      message: msg,
      data: data,
    };
    return res.status(409).json(resData);
  };
  const errorWithData = (res, msg) => {
    const resData = {
      status: 0,
      message: msg,
    };
    return res.status(404).json(resData);
  };
  const errorData = (res, msg) => {
    const resData = {
      status: 0,
      error: msg,
    };
    return res.status(400).json(resData);
  };
  
  const InternalServerErrorResponse = (res, error) => {
    const data = {
      status: 0,
      message: "Internal Server Error",
      error: error
    };
    return res.status(500).json(data);
  };
  
  module.exports = {
    successResponse,
    successResponseWithData,
    duplicationErrorWithData,
    InternalServerErrorResponse,
    errorWithData,
    errorData
  };