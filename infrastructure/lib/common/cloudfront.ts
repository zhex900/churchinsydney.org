import {
  aws_certificatemanager as certManager,
  aws_cloudfront as cloudFront,
  aws_route53 as route53,
  aws_route53_targets as route53Targets,
  CfnOutput,
  Stack,
} from 'aws-cdk-lib';
import { CloudFrontWebDistributionProps } from 'aws-cdk-lib/aws-cloudfront/lib/web-distribution';

export const createS3Cloudfront = (
  stack: Stack,
  certificateArn: string,
  domain: string,
  originUrl: string,
  hostedZoneId: string,
  cloudFrontProps?: Omit<CloudFrontWebDistributionProps, 'originConfigs'>
) => {
  const certificate = certManager.Certificate.fromCertificateArn(
    stack,
    `${stack}-cert`,
    certificateArn
  );

  const distribution = new cloudFront.CloudFrontWebDistribution(
    stack,
    `${stack}-cf-distribution`,
    {
      ...{
        viewerCertificate: cloudFront.ViewerCertificate.fromAcmCertificate(
          certificate,
          {
            aliases: [domain],
            securityPolicy: cloudFront.SecurityPolicyProtocol.TLS_V1_2_2021,
          }
        ),
        priceClass: cloudFront.PriceClass.PRICE_CLASS_ALL,
        defaultRootObject: '',
        originConfigs: [
          {
            customOriginSource: {
              domainName: originUrl,
            },
            behaviors: [
              {
                viewerProtocolPolicy:
                  cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                isDefaultBehavior: true,
                compress: true,
                allowedMethods: cloudFront.CloudFrontAllowedMethods.ALL,
                cachedMethods:
                  cloudFront.CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
                forwardedValues: {
                  queryString: true,
                  cookies: {
                    forward: 'none',
                  },
                  headers: [
                    'Access-Control-Request-Headers',
                    'Access-Control-Request-Method',
                    'Origin',
                  ],
                },
              },
            ],
          },
        ],
        comment: `${stack} - CloudFront Distribution`,
        viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      ...cloudFrontProps,
    }
  );

  const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
    stack,
    `${stack}-route53-hosted-zone`,
    {
      hostedZoneId,
      zoneName: domain,
    }
  );

  new route53.ARecord(stack, `${stack}-aliasForCloudfront`, {
    target: route53.RecordTarget.fromAlias(
      new route53Targets.CloudFrontTarget(distribution)
    ),
    zone: hostedZone,
    recordName: domain,
  });

  // Final CloudFront URL
  new CfnOutput(stack, `${stack}-CloudFront URL`, {
    value: distribution.distributionDomainName,
  });

  return { cloudFrontDistribution: distribution };
};
