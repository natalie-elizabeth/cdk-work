# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

Problem when creating the DB Cluster with the subnet group. This is the error gotten: `cdkWorkDocCluster DB subnet group 'CdkWorkSubnetGroup' does not exist. (Service: AmazonRDS; Status Code: 404; Error Code: DBSubnetGroupNotFoundFault; Request ID: 97c57053-46ad-4b10-ae26-879b01821f45)`. This occurs when using camelcase for the name of the subnet. When hyphens are introduced, it works okay.