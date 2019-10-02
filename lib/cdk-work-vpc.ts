import cdk = require('@aws-cdk/core');
import ec2 = require("@aws-cdk/aws-ec2");
import { stringToCloudFormation } from '@aws-cdk/core';
import { type } from 'os';

export class CdkWorkStackVPC extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpcCidr = "10.0.0.0/21";


    const vpc = new ec2.Vpc(this, "vpc", {
      cidr: vpcCidr,
      maxAzs: 2,
      vpnGateway: true
    });
    // vpc.addVpnConnection()

    // const sg = new ec2.SecurityGroup(this, "securityGroup", {
    //   vpc,
    //   securityGroupName: "Cdk-Sg",
    //   description: "Allow inbound and outbound traffic from the intenet and access to the VPC",
    //   allowAllOutbound: true
    // });
    // sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic(), "allow internet access");

    // const clientVPN = new ec2.CfnClientVpnEndpoint(this, "ClientVPN", {
    //   connectionLogOptions: {
    //     enabled: false
    //   },
    //   description: "Client VPN",
    //   clientCidrBlock: "10.0.0.0/22",
    //   serverCertificateArn: `process.env.SERVER_ARN`,
    //   authenticationOptions: [
    //     {
    //       mutualAuthentication: {
    //         clientRootCertificateChainArn: `process.env.CLIENT_ARN`
    //       },
    //       type: "certificate-authentication"
    //     }
    //   ]

    // });
  }
}
