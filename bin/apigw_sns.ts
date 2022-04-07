#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ApigwSnsStack } from '../lib/apigw_sns-stack';

const app = new cdk.App();
new ApigwSnsStack(app, 'ApigwSnsStack', {

});