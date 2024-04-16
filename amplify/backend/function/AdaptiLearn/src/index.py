import json
import openai
import os
import logging
import requests
import boto3
import random
from decimal import Decimal


logger = logging.getLogger()
logger.setLevel("INFO")

def handler(event, context):

    dynamodb = boto3.resource('dynamodb')
    indexTable = dynamodb.Table("questionIndex")
    questionTable = dynamodb.Table("Question-dnq2vqnyiffxfeewwwf253tad4-staging")
    userTable = dynamodb.Table("User-dnq2vqnyiffxfeewwwf253tad4-staging")

        # get the weight from user database and multiply with total questions
    data = [
        {"Subject": "Math", "Topic": "Fractions", "Weight": "A"},
        {"Subject": "Math", "Topic": "Algebra", "Weight": "B"},
        {"Subject": "Math", "Topic": "Subtraction", "Weight": "C"},

        {"Subject": "Science", "Topic": "Chemistry", "Weight": "A"},
        {"Subject": "Science", "Topic": "Biology", "Weight": "B"},
        {"Subject": "Science", "Topic": "Physics", "Weight": "C"}
    ]

    def getClientID():
        cognito_auth_provider = event.get("requestContext", {}).get("identity", {}).get("cognitoAuthenticationProvider", "")
        # Splitting the string to get the part after the last colon
        sub_value = cognito_auth_provider.split(':')[-1] if ':' in cognito_auth_provider else None
        return sub_value

    def getMaxIndex(indexTable,subject, topic):
        
        primary_key_value = subject + "_" + topic
        response = indexTable.get_item(Key={'key': primary_key_value})
        item = response.get('Item', {})
        if item:
            # Extract the maxIndex value and increment it
            max_index = item.get('maxIndex', 0)  # Default to 0 if not present

        return max_index

    def updateWeights(subject,data):
        # Update the item in DynamoDB with the new maxIndex value
        data = {k: Decimal(str(v)) for k, v in data.items()}
        update_response = userTable.update_item(
            Key={'id': getClientID()},
            UpdateExpression=f'SET {subject} = :val',
            ExpressionAttributeValues={
                ':val': data
            },
            ReturnValues="UPDATED_NEW"
        )
        return update_response

    def get_user_weights(subject):
        response = userTable.get_item(Key={'id': getClientID()})
        item = response.get('Item', {})
        if item:
            # Extract the maxIndex value and increment it
            weights = item.get(subject, {})  # Default to 0 if not present

        return weights

        response = userTable.get_item(Key={'id': client_id})
        item = response.get('Item', {})
        if item:
            # Extract the user data
            user_data = item.get('userData', {})
    def batch_get_dynamodb_items(table_name, partition_key_name, partition_key_values):
        """
        Fetches items in batch from a DynamoDB table and returns them as JSON strings.

        :param table_name: The name of the DynamoDB table.
        :param partition_key_name: The name of the partition key in the table.
        :param partition_key_values: A list of partition key values for the items to retrieve.
        :return: A list of JSON strings, where each JSON string represents an item retrieved from DynamoDB.
        """
        keys_to_get = [{partition_key_name: pk} for pk in partition_key_values]
        logger.info(f"Table name is {table_name.name}")
        logger.info(f"Keys to get: {keys_to_get}")
        
                # Define the request items
        request_items = {
            table_name.name: {
                'Keys': keys_to_get,
                # Remove AttributesToGet if you want all attributes
                'ProjectionExpression': 'question, options, explanation, correct_answer,topic'
            }
        }

                # Perform the batch get item operation
        response = dynamodb.batch_get_item(RequestItems=request_items)

        logger.info(f"Response: {response.get('Responses', {}).get(table_name.name, [])}")
        logger.info(f"Response type: {type(response.get('Responses', {}).get(table_name.name, []))}")

        return json.dumps(response.get('Responses', {}).get(table_name.name, []))


    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',  # Adjust as necessary for your use case
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }

    # Handle preflight OPTIONS request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps('CORS configuration')
        }

    path = event['path']

    if path == "/test":
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps('Hello from your new Amplify Python lambda! (api end point works)')
        }

    if path == "/getQuestions":
        event_body = json.loads(event['body'])
        subject = event_body["subject"]
        total_questions = 10
        weights = {key: float(value) for key, value in get_user_weights(subject).items()}

        # Calculate the number of questions for each weight ensuring at least one question per topic
        num_questions = {key: 1 for key in weights.keys()}  # Start each topic with 1 question
        allocated_questions = sum(num_questions.values())  # Total allocated so far

        # Remaining questions to distribute according to weights after ensuring one per topic
        remaining_questions = total_questions - allocated_questions

        # Adjust weights for remaining distribution (weights should sum to 1 after allocating one question to each)
        remaining_weights = {key: float(value) for key, value in weights.items()}
        total_weight = sum(remaining_weights.values())
        adjusted_weights = {key: (float(value) / total_weight) for key, value in remaining_weights.items()}

        # Calculate the number of questions for the remaining weights
        additional_questions = {key: int(remaining_questions * adjusted_weights[key]) for key, value in adjusted_weights.items()}
        for key, value in additional_questions.items():
            num_questions[key] += value

        # Recalculate remaining questions after distributing based on adjusted weights
        remaining_questions = total_questions - sum(num_questions.values())

        # Distribute any remaining questions randomly among the weights
        keys = list(num_questions.keys())
        random.shuffle(keys)
        for i in range(remaining_questions):
            num_questions[keys[i]] += 1

        # Print the number of questions for each weight
        for key, value in num_questions.items():
            logger.info(f"Weight {key}: {value} questions")
                    
        # Filter the data array to get only the objects with the desired subject
        question_array = [obj for obj in data if obj["Subject"] == subject]
        
            # Distribute the number of questions according to weights
        for item in question_array:
            weight = item["Weight"]
            item["Questions"] = num_questions[weight]

        question_array_json = json.dumps(question_array, indent=4)

        logger.info(f"Question array: {question_array_json}")
        # Convert the question_array to JSON string
        question_array_json = json.dumps(question_array)

        question_data = json.loads(question_array_json)

        # Iterate through each item in the data to generate questions
        results = []
        for item in question_data:
            subject = item["Subject"]
            topic = item["Topic"]
            num_questions = item["Questions"]
            
            max_index = getMaxIndex(indexTable, subject, topic)  # Replace None with your actual indexTable
            max_index = int(max_index)
            
            # Calculate sample size as the smaller of the number of questions or max_index
            sample_size = min(num_questions, max_index)
            
            # Generate random numbers safely
            if sample_size > 0:
                random_numbers = random.sample(range(max_index), sample_size)
            else:
                random_numbers = []

            # Format each element with subject_topic_randomNumber
            formatted_array = [f"{subject}_{topic}_{num}" for num in random_numbers]
            results.extend(formatted_array)

        logger.info(f"Formatted array: {results}")
        
        # Shuffle the entire list to mix questions from different topics
        random.shuffle(results)
        questionPool = batch_get_dynamodb_items(questionTable,"id",results)
        return {'statusCode': 200, 'headers': headers, 'body': questionPool}

    if path == "/updateUserWeights":
        scores = json.loads(event['body'])
        logger.info(f"scores: {scores}")

        weight_to_scores = {}

        # Fill 1 - percentage values
        for entry in data:
            topic = entry['Topic']
            weight = entry['Weight']
            subject = entry['Subject']  # Extract subject
            if topic in scores:
                score_details = scores[topic]
                percentage = float(score_details['percentage'])
                one_minus_percentage = 1 - (percentage / 100)
                weight_to_scores[weight] = one_minus_percentage

        # Calculate the sum of 1 - percentage values
        sum_one_minus_percentage = sum(weight_to_scores.values())

        # Calculate the updated weights, except for the last one
        weights_list = list(weight_to_scores.keys())
        updated_weights = {}
        for weight in weights_list[:-1]:  # Exclude the last weight from this loop
            updated_weights[weight] = weight_to_scores[weight] / sum_one_minus_percentage

        # Adjust the last weight to ensure the total is exactly 1
        last_weight = weights_list[-1]
        updated_weights[last_weight] = 1 - sum(updated_weights.values())

        # Output the final results
        logger.info(f"1 - Percentages: {weight_to_scores}")
        logger.info(f"Sum of 1 - Percentages: {sum_one_minus_percentage}")
        logger.info(f"Updated Weights: {updated_weights}")
        updateWeights(subject,updated_weights)
        logger.info("please work")



        return {'statusCode': 200, 'headers': headers, 'body': json.dumps("Weights updated successfully")}

    #
    return {'statusCode': 404, 'headers': headers, 'body': json.dumps("Failed to generate content")}
