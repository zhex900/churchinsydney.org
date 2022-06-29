#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';

import InfraStack from '../lib';

const app = new cdk.App();

InfraStack(app);
