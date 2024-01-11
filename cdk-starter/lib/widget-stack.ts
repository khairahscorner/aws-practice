import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as widget_service from './custom-constructs/widget_service';

export class WidgetServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new widget_service.WidgetService(this, 'Widgets');
  }
}
