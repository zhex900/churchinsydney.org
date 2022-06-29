import { aws_route53 as route53, Stack } from 'aws-cdk-lib';

export const getHostedZone = (stack: Stack, domainName: string) =>
  route53.HostedZone.fromLookup(stack, `${domainName}-route53-lookup`, {
    domainName: domainName,
  });
