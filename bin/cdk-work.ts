#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CdkWorkStack } from '../lib/cdk-work-stack';

const app = new cdk.App();
new CdkWorkStack(app, 'CdkWorkStack');