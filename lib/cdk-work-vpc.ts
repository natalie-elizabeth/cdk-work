import cdk = require('@aws-cdk/core');
import ec2 = require("@aws-cdk/aws-ec2");

export class CdkWorkStackVPC extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpcCidr = "10.0.0.0/21";

    const vpc = new ec2.Vpc(this, "vpc", {
      cidr: vpcCidr,
      maxAzs: 2,
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PRIVATE,
          cidrMask: 24,
          name: "PrivateSubnet1"
        },
        {
          subnetType: ec2.SubnetType.PRIVATE,
          cidrMask: 24,
          name: "PrivateSubnet2"
        },
        {
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 28,
          name: "PublicSubnet1"
        }
      ]
    });

  }
}
