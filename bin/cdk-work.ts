#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkWorkStackVPC } from './../lib/cdk-work-vpc';
import { CdkWorkDocumentDBStack } from './../lib/cdk-work-docdb';


const app = new cdk.App();
const app_env = {
    region: "us-east-1",
    account: "488823795428"
}
new CdkWorkStackVPC(app, 'CdkWorkStackVPC', {
    env: app_env
});

new CdkWorkDocumentDBStack(app, 'CdkWorkDocumentDBStack', {
    env: app_env
});