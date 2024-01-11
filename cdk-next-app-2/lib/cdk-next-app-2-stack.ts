import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  App,
  GitHubSourceCodeProvider,
  Platform,
  RedirectStatus
} from "@aws-cdk/aws-amplify-alpha";
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

export class CdkNextApp2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //create a new Amplify app
    const amplifyApp = new App(this, 'NextApp', {
      sourceCodeProvider: new GitHubSourceCodeProvider({
        owner: 'khairahscorner',
        repository: 'sample-next-app',
        oauthToken: cdk.SecretValue.secretsManager('github-token-cdk'),
      }),
      autoBranchDeletion: true,
      platform: Platform.WEB_COMPUTE,
      customRules: [{
        source: '/<*>',
        target: '/index.html',
        status: RedirectStatus.NOT_FOUND_REWRITE
      }],
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
          // Alternatively add a `amplify.yml` to the repo
          version: '1.0',
          frontend: {
            phases: {
              preBuild: {
                commands: ['npm ci'],
              },
              build: {
                commands: ['npm run build'],
              },
            },
            artifacts: {
              baseDirectory: '.next',
              files: ['**/*'],
            },
            // save time on npm reinstalling
            cache: {
              paths: ['node_modules/**/*'],
            }
          }
      }),
    })

    amplifyApp.addBranch('main', {
      stage: 'PRODUCTION',
    })
  }
}
