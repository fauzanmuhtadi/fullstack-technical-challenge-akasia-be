const httpResponse = (statusCodeParams, resultsParams, messageParams) => {
  const codes = [200, 401, 404, 403, 422, 500];
  const findCode = codes.find((httpCode) => httpCode == statusCodeParams);
  let message, error, code, result;

  findCode ? (code = findCode) : (code = 500);
  code === 200 ? (error = false) : (error = true);
  code === 200 ? (result = resultsParams) : (result = null);
  switch (code) {
    case 200:
      message = "OK";
      break;
    case 401:
      message = "Unauthorized access";
      break;
    case 404:
      message = "Not found";
      break;
    case 403:
      message = "Forbidden";
      break;
    case 422:
      message = "Unprocessable entity";
      break;
    default:
      message = "Something went wrong";
      break;
  }
  if (messageParams) console.error(`Error info: ${messageParams}`);
  if (resultsParams) console.log(`Result info: ${resultsParams}`);
  return { message, error, code, result };
};

module.exports = httpResponse;
