#!/usr/bin/env node
import { App } from 'aws-cdk-lib/core/lib/app';
import 'source-map-support/register';

import { RedirectCmsStack } from './redirect-cms';
import { RedirectWwwStack } from './redirect-www';

const infra = (app: App) => {
  const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  };

  return {
    RedirectCmsStack: new RedirectCmsStack(app, `redirect-cms-stack`, {
      env,
    }),
    RedirectWwwStack: new RedirectWwwStack(app, `redirect-www-stack`, {
      env,
    }),
  };
};

export default infra;
