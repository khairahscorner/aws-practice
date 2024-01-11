#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkNextApp2Stack } from '../lib/cdk-next-app-2-stack';

const app = new cdk.App();
new CdkNextApp2Stack(app, 'CdkNextApp2Stack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});