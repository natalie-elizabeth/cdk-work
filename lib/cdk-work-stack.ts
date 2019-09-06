import cdk = require('@aws-cdk/core');
import ec2 = require("@aws-cdk/aws-ec2");

export class CdkWorkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpcCidr = "10.0.0.0/21";

    const vpc = new ec2.Vpc(this, "vpc", {
      cidr: vpcCidr,
      maxAzs: 2
    });

  }
}
