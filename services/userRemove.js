const AWS = require('aws-sdk')
const util = require('../utils/util')

AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient()
const tableName = 'chat-users'

async function userRemove(userInfo){
    const username = userInfo.username;

    const param = {
        TableName: tableName,
        Key: {
            username: username
        }
    }

    const dbuser = await dynamodb.get(param).promise().then(response => {
        return response.Item
    }, error => {
        console.error('Server error. Please try again later', error)
    })

    if(!dbuser || !dbuser.username){
        return util.buildResponse(403, 'user with the given username does not exist') 
    }

    return await dynamodb.delete(param).promise().then(response => {
        return util.buildResponse(200, 'User was successfully deleted')
    }, error => {
        console.error(500, 'Server error. Please try again later', error)
    })
}

module.exports = {userRemove}