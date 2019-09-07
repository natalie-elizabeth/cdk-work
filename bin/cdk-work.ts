#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkWorkStackVPC } from './../lib/cdk-work-vpc';

const app = new cdk.App();
new CdkWorkStackVPC(app, 'CdkWorkStack');
