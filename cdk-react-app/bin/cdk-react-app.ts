#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkReactAppStack } from '../lib/cdk-react-app-stack';

const app = new cdk.App();
new CdkReactAppStack(app, 'CdkReactAppStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});