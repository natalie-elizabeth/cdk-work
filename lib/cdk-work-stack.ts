import cdk = require('@aws-cdk/core');
export class CdkWorkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  }
}
