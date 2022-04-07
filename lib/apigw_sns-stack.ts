import * as cdk from '@aws-cdk/core';
import { Role, ServicePrincipal,PolicyDocument, PolicyStatement } from '@aws-cdk/aws-iam';
import { Topic } from '@aws-cdk/aws-sns';
import { EndpointType, AuthorizationType, AwsIntegration, RestApi, PassthroughBehavior } from '@aws-cdk/aws-apigateway';

export class ApigwSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Create SNS Topic
    const topic = new Topic(this, 'topic',{
      topicName: 'demo_apigw_sns'
    })

    //Create IAM Role
    const gatewayExecutionRole: any = new Role(this, "GatewayExecutionRole", {
      assumedBy: new ServicePrincipal("apigateway.amazonaws.com"),
      inlinePolicies: {
        "PublishMessagePolicy": new PolicyDocument({
          statements: [new PolicyStatement({
            actions: ["sns:Publish"],
            resources: [topic.topicArn]
          })]
        })
      }
    });

    //Create REST API
    const restApi = new RestApi(this, 'SNSApi', {
      restApiName: 'Api Gateway SNS Proxy Service',
      description: "SNS Actions Proxy API",
      endpointConfiguration: {
        types: [EndpointType.EDGE]
      },
      binaryMediaTypes: ['application/octet-stream', 'image/jpeg']
    });

    //Create resource
    const resource = restApi.root.addResource("order");

    //Create API methods
    resource.addMethod('POST',
      new AwsIntegration({
        service: 'sns',
        integrationHttpMethod: 'POST',
        path: `${cdk.Stack.of(this).account}/${topic.topicName}`,
        options: {
          credentialsRole: gatewayExecutionRole,
          passthroughBehavior: PassthroughBehavior.NEVER,
          requestParameters: {
            "integration.request.header.Content-Type": `'application/x-www-form-urlencoded'`,
          },
          requestTemplates: {
            "application/json": `Action=Publish&TopicArn=$util.urlEncode('${topic.topicArn}')&Message=$util.urlEncode($input.body)`,
          },
          integrationResponses: [
            {
              statusCode: "200",
              responseTemplates: {
                "application/json": `{"status": "message added to topic"}`,
              },
            },
            {
              statusCode: "400",
              selectionPattern: "^\[Error\].*",
              responseTemplates: {
                "application/json": `{\"state\":\"error\",\"message\":\"$util.escapeJavaScript($input.path('$.errorMessage'))\"}`,
              },
            }
          ],
        }
      }),{ authorizationType: AuthorizationType.NONE,methodResponses: [{ statusCode: "200" }, { statusCode: "400" }] }
    );
  }
}