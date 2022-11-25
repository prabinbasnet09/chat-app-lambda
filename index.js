const loginService = require('./services/login')
const registerService = require('./services/register')
const  userAddService = require('./services/userAdd')
const userRemoveService = require('./services/userRemove')
const getUserService = require('./services/getUser')

exports.handler = async (event) => {
    let response;

    switch(true){
        case event.httpMethod === 'POST' && event.path === '/register':
            response = await registerService.register(JSON.parse(event.body));
            break;
        case event.httpMethod === 'POST' && event.path === '/login':
            response = await loginService.login(JSON.parse(event.body));
            break;
        case event.httpMethod === 'POST' && event.path === '/useradd':
            response = await userAddService.userAdd(JSON.parse(event.body));
            break;
        case event.httpMethod === 'DELETE' && event.path === '/userremove':
            response = await userRemoveService.userRemove(JSON.parse(event.body));
            break;
        case event.httpMethod === 'GET' && event.path === '/getusers':
            response = await getUserService.getUsers(JSON.parse(event.body));
            break;
        default:
            return 'Server error. Please try again later';
    }
    return response;
};
