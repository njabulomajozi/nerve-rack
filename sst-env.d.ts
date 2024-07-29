/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Email: {
      type: "sst.aws.ApiGatewayV2"
      url: string
    }
    SendEmail: {
      type: "sst.aws.Queue"
      url: string
    }
  }
}
export {}
