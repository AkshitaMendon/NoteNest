import { CognitoUserPool } from "amazon-cognito-identity-js";
import { COGNITO_CONFIG } from "./config";

if (!COGNITO_CONFIG.userPoolId || !COGNITO_CONFIG.clientId) {
  throw new Error("Cognito UserPoolId or ClientId is missing in configuration");
}

const poolData = {
  UserPoolId: COGNITO_CONFIG.userPoolId,
  ClientId: COGNITO_CONFIG.clientId,
};

export default new CognitoUserPool(poolData);