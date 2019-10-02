import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");
import docdb = require("@aws-cdk/aws-docdb");

export class CdkWorkDocumentDBStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // default documentdb port
    const port = 27017;

    // Use existing VPC
    const vpc = ec2.Vpc.fromLookup(this, 'CdkStackWorkVPC', {
      vpcName: 'CdkWorkStackVPC/vpc'
    });

    // Create Security Group
    const cdkWorkSecurityGroup = new ec2.SecurityGroup(this, 'CdkWorkSecurityGroup', {
      vpc,
      securityGroupName: 'CdkWorkSecurityGroup',
      description: 'Allow ssh access to ec2 instances from anywhere',
      allowAllOutbound: true
    });
    cdkWorkSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allows public ssh access')

    // Subnet group to be used by docDb Cluster
    const cdkWorkSubnetGroup = new docdb.CfnDBSubnetGroup(this, 'cdk-subnet-Group', {
      subnetIds: vpc.privateSubnets.map(x => x.subnetId),
      dbSubnetGroupName: 'cdk-subnet-group',
      dbSubnetGroupDescription: 'Subnet Group for CDKDocDB'
    });

    // Create documentdb cluster
    const cdkDocCluster = new docdb.CfnDBCluster(this, 'CdkWorkDocCluster', {
      storageEncrypted: true,
      availabilityZones: vpc.availabilityZones.splice(3),
      dbClusterIdentifier: 'CdkWorkDocCluster',
      masterUsername: process.env.MASTER_USERNAME,
      masterUserPassword: process.env.MASTER_PASSWORD,
      vpcSecurityGroupIds: [cdkWorkSecurityGroup.securityGroupName],
      dbSubnetGroupName: cdkWorkSubnetGroup.dbSubnetGroupName,
      port
    });
    cdkDocCluster.addDependsOn(cdkWorkSubnetGroup);

    // Create primary instance which if it fails, Docdb can promote a corresponding replica
    const cdkWorkDbInstance = new docdb.CfnDBInstance(this, 'CdkWorkDocdbIntance', {
      dbClusterIdentifier: cdkDocCluster.ref,
      dbInstanceClass: "db.r4.large",
      dbInstanceIdentifier: 'CdkWorkDocdbIntance',
      autoMinorVersionUpgrade: true
    });
    cdkWorkDbInstance.addDependsOn(cdkDocCluster);
  };
}