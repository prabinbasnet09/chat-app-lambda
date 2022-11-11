function buildResponse(statusCode, msg) {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg)
    }
}

module.exports = {buildResponse}