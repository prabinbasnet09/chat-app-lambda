const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'chat-clubs'

async function login(groupInfo){

} 

module.exports = {login}