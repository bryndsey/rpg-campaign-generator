import type { ResponseBody } from "./ResponseBody";

export type CampaignState =
  | {
      state: "initial";
    }
  | {
      state: "loading";
    }
  | {
      state: "data";
      data: ResponseBody;
    };
