console.log('Loading function');
const AWS = require('aws-sdk');
const sesClient = new AWS.SES();
const sesConfirmedAddress = "ajvillan22@yahoo.com";


exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var emailObj = event
    var params = getEmailMessage(emailObj);
    var sendEmailPromise = sesClient.sendEmail(params).promise();
    let responseBody = ""

    var response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: responseBody
    };

    sendEmailPromise.then(function (result) {
        console.log(result);
        callback(null, response);
        responseBody = result
    }).catch(function (err) {
        console.log(err);
        response.statusCode = 500;
        callback(null, response);
        responseBody = err
    });
};

function getEmailMessage(emailObj) {
    var emailRequestParams = {
        Destination: {
            ToAddresses: [emailObj.email]
        },
        Message: {
            Body: {
                Text: {
                    Data: emailObj.message
                }
            },
            Subject: {
                Data: emailObj.subject
            }
        },
        Source: sesConfirmedAddress,
        ReplyToAddresses: [emailObj.email]
    };

    return emailRequestParams;
}