// import cdk = require('@aws-cdk/core');
// import lambda = require('@aws-cdk/aws-lambda');
// import apigw =require('@aws-cdk/aws-apigateway');
// import { HitCounter } from './hitcounter';


// export class CdkWorkStack extends cdk.Stack {
//   constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     // hello is the name of the file and “handler” is the exported function name)
//     const hello = new lambda.Function(this, 'HelloHandler', { // lambda.Function is a construct
//       runtime: lambda.Runtime.NODEJS_8_10,      // execution environment
//       code: lambda.Code.asset('lambda'),  // code loaded from the "lambda" directory
//       handler: 'hello.handler'
//     });
//     const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
//       downstream: hello
//     })
//     new apigw.LambdaRestApi(this, 'Endpoint', {
//       handler: helloWithCounter.handler // whenever the endpoint is hit, APIGW routes the request to the hit counter handler that will log and relay it over to hello func
//       // responses are relayed back in reverse to the user
//     });
//   }
// }

import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigateway');
import { HitCounter } from './hitcounter';

export class CdkWorkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_8_10,
      code: lambda.Code.asset('lambda'),
      handler: 'hello.handler'
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });
  }
}
