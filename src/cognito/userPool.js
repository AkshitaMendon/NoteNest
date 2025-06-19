import { CognitoUserPool } from "amazon-cognito-identity-js";
import config from "./config";

const poolData = {
  UserPoolId: config.userPoolId,
  ClientId: config.clientId,
};

export default new CognitoUserPool(poolData);