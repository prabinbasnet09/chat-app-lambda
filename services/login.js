const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const util = require('../utils/util')

AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'chat-clubs'

async function login(groupInfo){
    const groupName = groupInfo.group_name;
    const groupPassword = groupInfo.group_password;

    const params = {
        TableName: tableName,
        Key: {
            group_name: groupName.trim()
        }
    }

    const group = await dynamodb.get(params).promise().then(response => {
        return response.Item
    }, error => {
        console.error('Server error',error)
    })

    if(!group || !group.group_name){
        return util.buildResponse(403, 'Group does not exist')
    }

    if(!bcrypt.compareSync(groupPassword, group.group_password)){
        return util.buildResponse(403, "Password is incorrect")
    }

    return util.buildResponse(200, 'User logged into group successfully')
} 

module.exports = {login}