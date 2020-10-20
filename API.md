# API Reference

**Classes**

Name|Description
----|-----------
[Bundle](#jordansinko-the-typescript-lambda-bundle)|*No description*
[DockerBundler](#jordansinko-the-typescript-lambda-dockerbundler)|*No description*
[EsbuildFunction](#jordansinko-the-typescript-lambda-esbuildfunction)|*No description*
[LocalBundler](#jordansinko-the-typescript-lambda-localbundler)|*No description*


**Structs**

Name|Description
----|-----------
[EsbuildBaseOptions](#jordansinko-the-typescript-lambda-esbuildbaseoptions)|*No description*
[EsbuildFunctionProps](#jordansinko-the-typescript-lambda-esbuildfunctionprops)|*No description*
[EsbuildOptions](#jordansinko-the-typescript-lambda-esbuildoptions)|*No description*



## class Bundle  <a id="jordansinko-the-typescript-lambda-bundle"></a>




### Initializer




```ts
new Bundle()
```



### Methods


#### *static* esbuild(options) <a id="jordansinko-the-typescript-lambda-bundle-esbuild"></a>



```ts
static esbuild(options: EsbuildOptions): AssetCode
```

* **options** (<code>[EsbuildOptions](#jordansinko-the-typescript-lambda-esbuildoptions)</code>)  *No description*
  * **externals** (<code>Array<string></code>)  Excludes modules from the bundle. __*Default*__: ['aws-sdk']
  * **minify** (<code>boolean</code>)  Bundle all dependencies into the output files. __*Default*__: false
  * **sourcemap** (<code>boolean</code>)  Emit a source map. __*Default*__: false
  * **entry** (<code>string</code>)  The file to build. 
  * **outdir** (<code>string</code>)  The directory to build to. 
  * **rootdir** (<code>string</code>)  The directory which contains necessary files and dependencies. 
  * **runtime** (<code>[Runtime](#aws-cdk-aws-lambda-runtime)</code>)  The runtime that will run the file. 

__Returns__:
* <code>[AssetCode](#aws-cdk-aws-lambda-assetcode)</code>



## class DockerBundler  <a id="jordansinko-the-typescript-lambda-dockerbundler"></a>




### Initializer




```ts
new DockerBundler()
```




### Properties


Name | Type | Description 
-----|------|-------------
**bundlingOptions** | <code>[BundlingOptions](#aws-cdk-core-bundlingoptions)</code> | <span></span>



## class EsbuildFunction  <a id="jordansinko-the-typescript-lambda-esbuildfunction"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IFunction](#aws-cdk-aws-lambda-ifunction), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource), [IConnectable](#aws-cdk-aws-ec2-iconnectable), [IGrantable](#aws-cdk-aws-iam-igrantable)
__Extends__: [Function](#aws-cdk-aws-lambda-function)

### Initializer




```ts
new EsbuildFunction(scope: Construct, id: string, props: EsbuildFunctionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[EsbuildFunctionProps](#jordansinko-the-typescript-lambda-esbuildfunctionprops)</code>)  *No description*
  * **maxEventAge** (<code>[Duration](#aws-cdk-core-duration)</code>)  The maximum age of a request that Lambda sends to a function for processing. __*Default*__: Duration.hours(6)
  * **onFailure** (<code>[IDestination](#aws-cdk-aws-lambda-idestination)</code>)  The destination for failed invocations. __*Default*__: no destination
  * **onSuccess** (<code>[IDestination](#aws-cdk-aws-lambda-idestination)</code>)  The destination for successful invocations. __*Default*__: no destination
  * **retryAttempts** (<code>number</code>)  The maximum number of times to retry when the function returns an error. __*Default*__: 2
  * **allowAllOutbound** (<code>boolean</code>)  Whether to allow the Lambda to send all network traffic. __*Default*__: true
  * **allowPublicSubnet** (<code>boolean</code>)  Lambda Functions in a public subnet can NOT access the internet. __*Default*__: false
  * **currentVersionOptions** (<code>[VersionOptions](#aws-cdk-aws-lambda-versionoptions)</code>)  Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method. __*Default*__: default options as described in `VersionOptions`
  * **deadLetterQueue** (<code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code>)  The SQS queue to use if DLQ is enabled. __*Default*__: SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`
  * **deadLetterQueueEnabled** (<code>boolean</code>)  Enabled DLQ. __*Default*__: false unless `deadLetterQueue` is set, which implies DLQ is enabled.
  * **description** (<code>string</code>)  A description of the function. __*Default*__: No description.
  * **environment** (<code>Map<string, string></code>)  Key-value pairs that Lambda caches and makes available for your Lambda functions. __*Default*__: No environment variables.
  * **events** (<code>Array<[IEventSource](#aws-cdk-aws-lambda-ieventsource)></code>)  Event sources for this function. __*Default*__: No event sources.
  * **filesystem** (<code>[FileSystem](#aws-cdk-aws-lambda-filesystem)</code>)  The filesystem configuration for the lambda function. __*Default*__: will not mount any filesystem
  * **functionName** (<code>string</code>)  A name for the function. __*Default*__: AWS CloudFormation generates a unique physical ID and uses that ID for the function's name. For more information, see Name Type.
  * **initialPolicy** (<code>Array<[PolicyStatement](#aws-cdk-aws-iam-policystatement)></code>)  Initial policy statements to add to the created Lambda Role. __*Default*__: No policy statements are added to the created Lambda role.
  * **layers** (<code>Array<[ILayerVersion](#aws-cdk-aws-lambda-ilayerversion)></code>)  A list of layers to add to the function's execution environment. __*Default*__: No layers.
  * **logRetention** (<code>[RetentionDays](#aws-cdk-aws-logs-retentiondays)</code>)  The number of days log events are kept in CloudWatch Logs. __*Default*__: logs.RetentionDays.INFINITE
  * **logRetentionRetryOptions** (<code>[LogRetentionRetryOptions](#aws-cdk-aws-lambda-logretentionretryoptions)</code>)  When log retention is specified, a custom resource attempts to create the CloudWatch log group. __*Default*__: Default AWS SDK retry options.
  * **logRetentionRole** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The IAM role for the Lambda function associated with the custom resource that sets the retention policy. __*Default*__: A new role is created.
  * **memorySize** (<code>number</code>)  The amount of memory, in MB, that is allocated to your Lambda function. __*Default*__: 128
  * **profiling** (<code>boolean</code>)  Enable profiling. __*Default*__: No profiling.
  * **profilingGroup** (<code>[IProfilingGroup](#aws-cdk-aws-codeguruprofiler-iprofilinggroup)</code>)  Profiling Group. __*Default*__: A new profiling group will be created if `profiling` is set.
  * **reservedConcurrentExecutions** (<code>number</code>)  The maximum of concurrent executions you want to reserve for the function. __*Default*__: No specific limit - account limit.
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  Lambda execution role. __*Default*__: A unique role will be generated for this lambda function. Both supplied and generated roles can always be changed by calling `addToRolePolicy`.
  * **securityGroup** (<code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code>)  What security group to associate with the Lambda's network interfaces. This property is being deprecated, consider using securityGroups instead. __*Default*__: If the function is placed within a VPC and a security group is not specified, either by this or securityGroups prop, a dedicated security group will be created for this function.
  * **securityGroups** (<code>Array<[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)></code>)  The list of security groups to associate with the Lambda's network interfaces. __*Default*__: If the function is placed within a VPC and a security group is not specified, either by this or securityGroup prop, a dedicated security group will be created for this function.
  * **timeout** (<code>[Duration](#aws-cdk-core-duration)</code>)  The function execution time (in seconds) after which Lambda terminates the function. __*Default*__: Duration.seconds(3)
  * **tracing** (<code>[Tracing](#aws-cdk-aws-lambda-tracing)</code>)  Enable AWS X-Ray Tracing for Lambda Function. __*Default*__: Tracing.Disabled
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  VPC network to place Lambda network interfaces. __*Default*__: Function is not placed within a VPC.
  * **vpcSubnets** (<code>[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)</code>)  Where to place the network interfaces within the VPC. __*Default*__: the Vpc default strategy if not specified
  * **externals** (<code>Array<string></code>)  Excludes modules from the bundle. __*Default*__: ['aws-sdk']
  * **minify** (<code>boolean</code>)  Bundle all dependencies into the output files. __*Default*__: false
  * **sourcemap** (<code>boolean</code>)  Emit a source map. __*Default*__: false
  * **entry** (<code>string</code>)  The file to build relative to `rootdir`. 
  * **rootdir** (<code>string</code>)  The directory which contains necessary files and dependencies. 
  * **handler** (<code>string</code>)  The exported handler function name. __*Default*__: 'handler'
  * **outdir** (<code>string</code>)  The directory to build to. __*Default*__: '/asset-output'
  * **runtime** (<code>[Runtime](#aws-cdk-aws-lambda-runtime)</code>)  The runtime that will run the file. __*Default*__: `NODEJS_12_X`




## class LocalBundler  <a id="jordansinko-the-typescript-lambda-localbundler"></a>



__Implements__: [ILocalBundling](#aws-cdk-core-ilocalbundling)

### Initializer




```ts
new LocalBundler()
```



### Methods


#### tryBundle(_outputDir, _options) <a id="jordansinko-the-typescript-lambda-localbundler-trybundle"></a>

(experimental) This method is called before attempting docker bundling to allow the bundler to be executed locally.

If the local bundler exists, and bundling
was performed locally, return `true`. Otherwise, return `false`.

```ts
tryBundle(_outputDir: string, _options: BundlingOptions): boolean
```

* **_outputDir** (<code>string</code>)  *No description*
* **_options** (<code>[BundlingOptions](#aws-cdk-core-bundlingoptions)</code>)  *No description*
  * **image** (<code>[BundlingDockerImage](#aws-cdk-core-bundlingdockerimage)</code>)  The Docker image where the command will run. 
  * **command** (<code>Array<string></code>)  The command to run in the Docker container. __*Default*__: run the command defined in the image
  * **environment** (<code>Map<string, string></code>)  The environment variables to pass to the Docker container. __*Default*__: no environment variables.
  * **local** (<code>[ILocalBundling](#aws-cdk-core-ilocalbundling)</code>)  Local bundling provider. __*Default*__: bundling will only be performed in a Docker container
  * **user** (<code>string</code>)  The user to use when running the Docker container. __*Default*__: uid:gid of the current user or 1000:1000 on Windows
  * **volumes** (<code>Array<[DockerVolume](#aws-cdk-core-dockervolume)></code>)  Additional Docker volumes to mount. __*Default*__: no additional volumes are mounted
  * **workingDirectory** (<code>string</code>)  Working directory inside the Docker container. __*Default*__: /asset-input

__Returns__:
* <code>boolean</code>



## struct EsbuildBaseOptions  <a id="jordansinko-the-typescript-lambda-esbuildbaseoptions"></a>






Name | Type | Description 
-----|------|-------------
**externals**? | <code>Array<string></code> | Excludes modules from the bundle.<br/>__*Default*__: ['aws-sdk']
**minify**? | <code>boolean</code> | Bundle all dependencies into the output files.<br/>__*Default*__: false
**sourcemap**? | <code>boolean</code> | Emit a source map.<br/>__*Default*__: false



## struct EsbuildFunctionProps  <a id="jordansinko-the-typescript-lambda-esbuildfunctionprops"></a>






Name | Type | Description 
-----|------|-------------
**entry** | <code>string</code> | The file to build relative to `rootdir`.
**rootdir** | <code>string</code> | The directory which contains necessary files and dependencies.
**allowAllOutbound**? | <code>boolean</code> | Whether to allow the Lambda to send all network traffic.<br/>__*Default*__: true
**allowPublicSubnet**? | <code>boolean</code> | Lambda Functions in a public subnet can NOT access the internet.<br/>__*Default*__: false
**currentVersionOptions**? | <code>[VersionOptions](#aws-cdk-aws-lambda-versionoptions)</code> | Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.<br/>__*Default*__: default options as described in `VersionOptions`
**deadLetterQueue**? | <code>[IQueue](#aws-cdk-aws-sqs-iqueue)</code> | The SQS queue to use if DLQ is enabled.<br/>__*Default*__: SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`
**deadLetterQueueEnabled**? | <code>boolean</code> | Enabled DLQ.<br/>__*Default*__: false unless `deadLetterQueue` is set, which implies DLQ is enabled.
**description**? | <code>string</code> | A description of the function.<br/>__*Default*__: No description.
**environment**? | <code>Map<string, string></code> | Key-value pairs that Lambda caches and makes available for your Lambda functions.<br/>__*Default*__: No environment variables.
**events**? | <code>Array<[IEventSource](#aws-cdk-aws-lambda-ieventsource)></code> | Event sources for this function.<br/>__*Default*__: No event sources.
**externals**? | <code>Array<string></code> | Excludes modules from the bundle.<br/>__*Default*__: ['aws-sdk']
**filesystem**? | <code>[FileSystem](#aws-cdk-aws-lambda-filesystem)</code> | The filesystem configuration for the lambda function.<br/>__*Default*__: will not mount any filesystem
**functionName**? | <code>string</code> | A name for the function.<br/>__*Default*__: AWS CloudFormation generates a unique physical ID and uses that ID for the function's name. For more information, see Name Type.
**handler**? | <code>string</code> | The exported handler function name.<br/>__*Default*__: 'handler'
**initialPolicy**? | <code>Array<[PolicyStatement](#aws-cdk-aws-iam-policystatement)></code> | Initial policy statements to add to the created Lambda Role.<br/>__*Default*__: No policy statements are added to the created Lambda role.
**layers**? | <code>Array<[ILayerVersion](#aws-cdk-aws-lambda-ilayerversion)></code> | A list of layers to add to the function's execution environment.<br/>__*Default*__: No layers.
**logRetention**? | <code>[RetentionDays](#aws-cdk-aws-logs-retentiondays)</code> | The number of days log events are kept in CloudWatch Logs.<br/>__*Default*__: logs.RetentionDays.INFINITE
**logRetentionRetryOptions**? | <code>[LogRetentionRetryOptions](#aws-cdk-aws-lambda-logretentionretryoptions)</code> | When log retention is specified, a custom resource attempts to create the CloudWatch log group.<br/>__*Default*__: Default AWS SDK retry options.
**logRetentionRole**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The IAM role for the Lambda function associated with the custom resource that sets the retention policy.<br/>__*Default*__: A new role is created.
**maxEventAge**? | <code>[Duration](#aws-cdk-core-duration)</code> | The maximum age of a request that Lambda sends to a function for processing.<br/>__*Default*__: Duration.hours(6)
**memorySize**? | <code>number</code> | The amount of memory, in MB, that is allocated to your Lambda function.<br/>__*Default*__: 128
**minify**? | <code>boolean</code> | Bundle all dependencies into the output files.<br/>__*Default*__: false
**onFailure**? | <code>[IDestination](#aws-cdk-aws-lambda-idestination)</code> | The destination for failed invocations.<br/>__*Default*__: no destination
**onSuccess**? | <code>[IDestination](#aws-cdk-aws-lambda-idestination)</code> | The destination for successful invocations.<br/>__*Default*__: no destination
**outdir**? | <code>string</code> | The directory to build to.<br/>__*Default*__: '/asset-output'
**profiling**? | <code>boolean</code> | Enable profiling.<br/>__*Default*__: No profiling.
**profilingGroup**? | <code>[IProfilingGroup](#aws-cdk-aws-codeguruprofiler-iprofilinggroup)</code> | Profiling Group.<br/>__*Default*__: A new profiling group will be created if `profiling` is set.
**reservedConcurrentExecutions**? | <code>number</code> | The maximum of concurrent executions you want to reserve for the function.<br/>__*Default*__: No specific limit - account limit.
**retryAttempts**? | <code>number</code> | The maximum number of times to retry when the function returns an error.<br/>__*Default*__: 2
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | Lambda execution role.<br/>__*Default*__: A unique role will be generated for this lambda function. Both supplied and generated roles can always be changed by calling `addToRolePolicy`.
**runtime**? | <code>[Runtime](#aws-cdk-aws-lambda-runtime)</code> | The runtime that will run the file.<br/>__*Default*__: `NODEJS_12_X`
**securityGroup**?⚠️ | <code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code> | What security group to associate with the Lambda's network interfaces. This property is being deprecated, consider using securityGroups instead.<br/>__*Default*__: If the function is placed within a VPC and a security group is not specified, either by this or securityGroups prop, a dedicated security group will be created for this function.
**securityGroups**? | <code>Array<[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)></code> | The list of security groups to associate with the Lambda's network interfaces.<br/>__*Default*__: If the function is placed within a VPC and a security group is not specified, either by this or securityGroup prop, a dedicated security group will be created for this function.
**sourcemap**? | <code>boolean</code> | Emit a source map.<br/>__*Default*__: false
**timeout**? | <code>[Duration](#aws-cdk-core-duration)</code> | The function execution time (in seconds) after which Lambda terminates the function.<br/>__*Default*__: Duration.seconds(3)
**tracing**? | <code>[Tracing](#aws-cdk-aws-lambda-tracing)</code> | Enable AWS X-Ray Tracing for Lambda Function.<br/>__*Default*__: Tracing.Disabled
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | VPC network to place Lambda network interfaces.<br/>__*Default*__: Function is not placed within a VPC.
**vpcSubnets**? | <code>[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)</code> | Where to place the network interfaces within the VPC.<br/>__*Default*__: the Vpc default strategy if not specified



## struct EsbuildOptions  <a id="jordansinko-the-typescript-lambda-esbuildoptions"></a>






Name | Type | Description 
-----|------|-------------
**entry** | <code>string</code> | The file to build.
**outdir** | <code>string</code> | The directory to build to.
**rootdir** | <code>string</code> | The directory which contains necessary files and dependencies.
**runtime** | <code>[Runtime](#aws-cdk-aws-lambda-runtime)</code> | The runtime that will run the file.
**externals**? | <code>Array<string></code> | Excludes modules from the bundle.<br/>__*Default*__: ['aws-sdk']
**minify**? | <code>boolean</code> | Bundle all dependencies into the output files.<br/>__*Default*__: false
**sourcemap**? | <code>boolean</code> | Emit a source map.<br/>__*Default*__: false



