import { Stack, StackProps } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class VpcStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //using cloudformation-specific resources
    new ec2.CfnVPC(this, "cfVpc", {
      cidrBlock: "10.0.0.0/16",
    });

    //aws services-level resources
    let currVpc = new ec2.Vpc(this, "regularVPC", {
      ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
    });

    // console.log("stack:", currVpc.stack.stackId);
    // console.log(currVpc.stack.availabilityZones);
    // console.log(currVpc.availabilityZones);
  }
}
