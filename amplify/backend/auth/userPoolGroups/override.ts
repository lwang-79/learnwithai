import {
  AmplifyProjectInfo,
  AmplifyUserPoolGroupStackTemplate,
} from "@aws-amplify/cli-extensibility-helper";

export function override(
  resources: AmplifyUserPoolGroupStackTemplate,
  amplifyProjectInfo: AmplifyProjectInfo,
) {
  const authRole = resources.userPoolGroupRole["Admin"];

  const basePolicies = Array.isArray(authRole.policies)
    ? authRole.policies
    : [authRole.policies];

  authRole.policies = [
    ...basePolicies,
    {
      policyName: "amplify-permissions-custom-resources",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Resource: "arn:aws:lambda:*:*:function:learnwithaiOpenaiAPI*", //resource to permission, needs to be restricted for according to scope
            Action: ["lambda:InvokeFunction"], //permissions
            Effect: "Allow", //action allow or deny
          },
          {
            Resource: "*",
            Action: ["polly:SynthesizeSpeech"],
            Effect: "Allow",
          },
        ],
      },
    },
  ];
}
