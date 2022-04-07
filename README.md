## Example
This example presents one approach to building serverless event driven architecture.  The example demonstrates how to send notifications using Amazon API Gateway and Amazon SNS. A complete solution would most likely include additional AWS services, in this case, the example focuses on how to trigger an email notification using Amazon SNS and Amazon API Gateway. You will need an email account that you have access to.

![architecture](./images/architecture_1.png "Architecture")

## Setup

You will need to download and install [Node.js](https://nodejs.org/en/download/) before you can start using the AWS Cloud Development Kit.

This example is developed using the AWS CDK and Typescript, so you will need to install both Typescript and the CDK using the following commands
```
npm install -g typescript
npm install -g aws-cdk@latest
```
Since this CDK project uses ['Assests'](https://docs.aws.amazon.com/cdk/latest/guide/assets.html), you might need to run the following command to provision resources the AWS CDK will need to perform the deployment.

```bash
cdk bootstrap
```

The testing scripts can be executed using Jupyter Notebook. There are a few methods for installing Jupyter Notebooks. These instructions will help you get to started with [JupyterLab](https://jupyter.org/install) installation.

You can also install Jupyter Notebooks as part of [Anaconda](https://docs.anaconda.com/anaconda/install/index.html) installation.

To download this example, you will need to install [Git](https://github.com/git-guides/install-git). After installing git follow these [instructions](https://github.com/git-guides/git-clone) to learn how to clone the repository.

After the repository has been cloned set the command prompt path to the cloned directory and run the following command to install the project dependencies.

```bash
npm install
```

**cdk synth** executes the application which translates the Typescript code into an AWS CloudFormation template.

```bash
cdk synth
```

After the synth command has generated the template use the  **cdk deploy** command to deploy the template to AWS CloudFormation and build the stack. You will be prompted to confirm the deployment with y/n.

```bash
cdk deploy
```
## Test the Stack
We need to install Jest since we are using the Jest framework to test the stack. Testing the stack is optional.
```
npm install --save-dev jest @types/jest @aws-cdk/assert
```

## Run the Example
Open the Jupyter Notebook in the **jupyter_notebook directory** follow the instructions.

## Cleanup
From the command prompt execute the following command: **cdk destroy**

## Deploy Resources
|	Identifier	|	Service	|	Type	|
|	:---	|	:---	|	:---	|
ApigwSnsStack-GatewayExecutionRole16B5E8DF-9KLK4A4BTRA1	|	IAM |	Role
restapis/y97h9od2td	|	ApiGateway |	RestApi
account/ApigwS-SNSAp-bNRFmHQe0b4r	|	ApiGateway |	Account
ApigwSnsStack-SNSApiCloudWatchRole70B9714E-1BMPF5ZKG083J	|	IAM |	Role
demo_apigw_sns	|	SNS |	Topic
