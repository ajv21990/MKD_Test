const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;
    const { MessageID, message } = JSON.parse(event.body);
    let params = {
        TableName: "MK_Test",
        Item: {
            MessageID: MessageID,
            message: message
        }
    };
    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;

    } catch (err) {
        responseBody = `Unable to put Message: ${err}`;
        statusCode = 403;
    };

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: responseBody
    };
    return response
};


// const AWS = require("aws-sdk");

// exports.handler = async (event, context) => {
//     const documentClient = new AWS.DynamoDB.DocumentClient();

//     let responseBody = "";
//     let statusCode = 0;
//     const { MessageID, message } = JSON.parse(event.body);
//     let params = {
//         TableName: "MK_Test",
//         Item: {
//             MessageID: MessageID,
//             message: message
//         }
//     };
//     try {
//         const data = await documentClient.put(params).promise();
//         responseBody = JSON.stringify(data);
//         statusCode = 201;

//     } catch (err) {
//         responseBody = `Unable to put Message: ${err}`;
//         statusCode = 403;
//     }

//     const response = {
//         statusCode: statusCode,
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: responseBody
//     };
//     return response;
// };
