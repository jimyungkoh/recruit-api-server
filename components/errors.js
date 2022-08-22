class BasicError extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

class BadRequestError extends BasicError {
  constructor(message) {
    super('BadRequestError', message, 400);
  }
}

class NotFoundError extends BasicError {
  constructor(message) {
    super('NotFoundError', message, 404);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
};
