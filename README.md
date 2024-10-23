# Boilerplate Typescript, Node.js, Serverless Framework, Lambdas and DynamoDB

This project is a basic template designed for interview purposes. It is built using TypeScript, Node.js, the Serverless Framework, AWS Lambdas, and DynamoDB, and is deployed via GitHub Actions. This boilerplate provides a strong foundation for building a web application, allowing you to focus on implementing business logic without needing to handle the initial setup.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Serveless Framework](https://www.serverless.com/)
- [AWS Credentials](https://docs.aws.amazon.com/cli/v1/userguide/cli-configure-files.html)

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/GiulianaEOlmos/boilerplate-node-lambdas-dynamodb.git
   cd boilerplate-node-lambdas-dynamodb
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

### Deployment

You can deploy this template either using GitHub Actions or manually from your local machine.

#### Using GitHub Actions

This project is set up to automatically deploy when a release is created. To ensure this works, you'll need to configure the following secrets in GitHub:

```bash
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SERVERLESS_ACCESS_KEY: ${{ secrets.SERVERLESS_ACCESS_KEY }}
```

Navigate to **Settings** > **Secrets and variables** > **Actions** in your GitHub repository to add these secrets.

#### Manual Deployment via Serverless Framework

If you'd prefer to deploy manually, make sure your AWS credentials are configured locally. Then, run the following commands:

```bash
npm run build
serverless deploy
```

### API Endpoints

The following are the available API endpoints for this project. Please note that these links are for example purposes and may no longer work. To test the API, you will need to deploy the code on your own AWS account.

For your convenience, I've included a Postman collection that you can import to quickly get started with testing the API.

[Download Postman Collection](Boilerplate%20Serverless%20Lambdas%20+%20Dynamo.postman_collection.json)

#### 1. **Create User**

- **Method**: `POST`
- **URL**: `users/create`

#### 2. **Get All Users**

- **Method**: `GET`
- **URL**: `users/getUsers`

#### 3. **Delete User**

- **Method**: `DELETE`
- **URL**: `users/deleteUser`

#### 4. **Update User**

- **Method**: `PUT`
- **URL**: `users/updateUser`

#### 5. **Create Users by Transaction**

- **Method**: `POST`
- **URL**: `users/createUsersTransaction`

### Test Locally

After deploying the project, if you want to test the Lambdas locally, you can run:

```bash
npm run build
serverless offline
```

This will start the application on your local machine, and you will be able to test the routes on `localhost` without needing to redeploy the Lambda functions.

### Tests

To run the unit tests for the project, use the following command:

```bash
npm run tests
```

#### Blog

If you're interested in learning more about how I built this boilerplate, check out my blog post where I explain the process:
