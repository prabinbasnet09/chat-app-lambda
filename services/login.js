const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'chat-clubs'

async function login(groupInfo){
    const groupName = groupInfo.group_name;
    const groupPassword = groupInfo.group_password;

    group = {
        TableName: tableName,
        Key: {
            group_name: groupName.trim()
        }
    }

    const group = await dynamodb.get(group).promise().then(response => {
        return response.Item
    }, error => {
        console.error('Server error',error)
    })

    if(!group || !group.groupName){
        return util.buildResponse(403, 'Group does not exist')
    }

    if(!bcrypt.compareSync(groupPassword, group.group_password)){
        return util.buildResponse(403, "Password is incorrect")
    }
} 

module.exports = {login}