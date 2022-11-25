const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient()
const tableName = "chat-clubs";

async function register(groupInfo){
    const groupName = groupInfo.group_name;
    const groupPassword = groupInfo.group_password;
    const encryptedPassword = bcrypt.hashSync(groupPassword, 10);
    
    const group = {
        TableName: tableName,
        Item: {
            group_name: groupName.trim(),
            group_password: encryptedPassword
        }
    }

    return await dynamodb.put(group).promise().then(response => {
        return response;
    }, error => {
        console.error('There was an error in saving the user', error)
    })
}

module.exports = {register}