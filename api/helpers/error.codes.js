
// 00 Bad Request. ...
// 401 Unauthorized. ...
// 403 Forbidden. ...
// 404 Not Found. ...
// 500 Internal Server Error. ...
// 502 Bad Gateway. ...
// 503 Service Unavailable. ...
// 504 Gateway Timeout.

const errors = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    OK: 200
}

module.exports = errors