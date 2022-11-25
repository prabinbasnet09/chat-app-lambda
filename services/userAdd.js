const AWS = require('aws-sdk')
const util = require('../utils/util')

AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient()
const tableName = "chat-users"

async function userAdd(userInfo){
    const {user_id, username, room} = userInfo
    const param = {
        TableName: tableName,
        Key: {
            username: username
        }
    }

    const dbUser = await dynamodb.get(param).promise().then(response => {
        return response.Item;
    }, error => {
        console.error("Server error. Please try again later!", error)
    })

    if(dbUser){
        return util.buildResponse(403, "Username is already taken")
    }

    const user = {
        TableName: tableName,
        Item: {
            user_id: user_id,
            username: username,
            room: room,
        }
    }

    return await dynamodb.put(user).promise().then(response => {
        return response;
    }, error => {
        console.error("Server error", error)
    })
}

module.exports = {userAdd}