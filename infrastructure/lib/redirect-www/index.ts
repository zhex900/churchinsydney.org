import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { createS3Cloudfront } from '../common/cloudfront';
import { getHostedZone } from '../common/route53';

export class RedirectWwwStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const CERTIFICATE_ARN = this.node.tryGetContext(
      'CERTIFICATE_ARN_US_EAST_1'
    );

    const BASE_DOMAIN_NAME = this.node.tryGetContext('BASE_DOMAIN_NAME');
    const DOMAIN_NAME = `www.${BASE_DOMAIN_NAME}`;
    const { hostedZoneId } = getHostedZone(this, BASE_DOMAIN_NAME);

    this.templateOptions.description = `${BASE_DOMAIN_NAME} - cms redirect`;

    createS3Cloudfront(
      this,
      CERTIFICATE_ARN,
      DOMAIN_NAME,
      BASE_DOMAIN_NAME,
      hostedZoneId
    );
  }
}
