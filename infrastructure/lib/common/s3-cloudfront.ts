import {
  aws_certificatemanager as certManager,
  aws_cloudfront as cloudFront,
  aws_route53 as route53,
  aws_route53_targets as route53Targets,
  aws_s3 as s3,
  CfnOutput,
  RemovalPolicy,
  Stack,
} from 'aws-cdk-lib';
import {
  OriginProtocolPolicy,
  OriginSslPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BucketProps } from 'aws-cdk-lib/aws-s3/lib/bucket';

export const createS3Cloudfront = (
  stack: Stack,
  certificateArn: string,
  domain: string,
  bucketName: string,
  hostedZoneId: string,
  awsRegion: string,
  s3Props?: BucketProps
) => {
  // Add S3 Bucket
  const s3Bucket = new s3.Bucket(stack, `${bucketName}`, {
    bucketName,
    //automatically empty the bucket's contents when our stack is deleted
    autoDeleteObjects: true,
    removalPolicy: RemovalPolicy.DESTROY,
    blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    ...s3Props,
  });

  const certificate = certManager.Certificate.fromCertificateArn(
    stack,
    `${bucketName}-cert`,
    certificateArn
  );

  const distribution = new cloudFront.Distribution(
    stack,
    `${bucketName}-cf-distribution`,
    {
      defaultBehavior: {
        origin: new HttpOrigin(
          `${bucketName}.s3-website-${awsRegion}.amazonaws.com`,
          {
            protocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
            originSslProtocols: [
              OriginSslPolicy.TLS_V1,
              OriginSslPolicy.TLS_V1_1,
              OriginSslPolicy.TLS_V1_2,
            ],
          }
        ),
        cachePolicy: cloudFront.CachePolicy.CACHING_OPTIMIZED,
        viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [domain],
      certificate,
      defaultRootObject: '',
      priceClass: cloudFront.PriceClass.PRICE_CLASS_ALL,
    }
  );

  const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
    stack,
    `${bucketName}-route53-hosted-zone`,
    {
      hostedZoneId,
      zoneName: domain,
    }
  );

  new route53.ARecord(stack, `${bucketName}-aliasForCloudfront`, {
    target: route53.RecordTarget.fromAlias(
      new route53Targets.CloudFrontTarget(distribution)
    ),
    zone: hostedZone,
    recordName: domain,
  });

  // Final CloudFront URL
  new CfnOutput(stack, `${bucketName}-CloudFront URL`, {
    value: distribution.distributionDomainName,
  });

  return { s3Bucket, cloudFrontDistribution: distribution };
};
