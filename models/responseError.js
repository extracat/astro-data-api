class ResponseError {
  status;
  code;
  message;
  constructor(status, code, message) {
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

module.exports = { 
  ResponseError,
 };