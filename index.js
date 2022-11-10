const loginService = require('./services/login')
const registerService = require('./services/register')

exports.handler = async (event) => {
    let response;

    switch(true){
        case event.httpMethod === 'POST' && event.path === '/register':
            response = await registerService.register(JSON.parse(event.body));
            break;
        case event.httpMethod === 'POST' && event.path === '/login':
            response = await loginService.login(JSON.parse(event.body));
            break;
        default:
            return 'Server error. Please try again later';
    }
    return response;
};
