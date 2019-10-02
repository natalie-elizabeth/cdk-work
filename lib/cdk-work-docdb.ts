import { CdkWorkStackVPC } from './cdk-work-vpc';
import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");
import docdb = require("@aws-cdk/aws-docdb");

export class CdkWorkDocumentDBStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // default documentdb port
    const port = 27017;

    // // Use existing VPC
    // const vpc = ec2.Vpc.fromLookup(this, 
    };
}