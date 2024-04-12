const AWS = require('aws-sdk');
AWS.config.region =process.env.AWS_REGION;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  if (event.request.userAttributes.email && event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    // Define the DynamoDB table name
    const tableName = 'User-dnq2vqnyiffxfeewwwf253tad4-staging';

    // Prepare the item to add to DynamoDB
    const item = {
      // Assume there's a 'UserID' primary key, adjust according to your table's schema
      id: event.request.userAttributes.sub, // Use the Cognito user's unique ID
      Science: {A:0.34,B:0.33,C:0.33},
      Math: {A:0.34,B:0.33,C:0.33},
      Computer: {A:0.34,B:0.33,C:0.33},
      // Add other user attributes you might want to store
    };

    // DynamoDB put parameters
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      // Add the user to DynamoDB
      await dynamoDb.put(params).promise();
      console.log('User added to DynamoDB:', item);
    } catch (error) {
      console.error('Error adding user to DynamoDB:', error);
      // Handle the error appropriately. You might want to return a different response or throw an error
    }
  }

  // Return the event object back to Cognito
  return event;
};
