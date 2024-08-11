/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "Communication": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "Email": {
      "sender": string
      "type": "sst.aws.Email"
    }
    "Web": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
  }
}
export {}
