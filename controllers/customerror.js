class customerror extends Error {
    constructor(statuscode, message) {
        super(message);
        this.statuscode = statuscode;
        this.status = statuscode >= 400 && statuscode <= 500 ? 'failure' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = customerror