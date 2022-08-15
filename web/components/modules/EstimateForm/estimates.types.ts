import { StrRecord } from "types/util/StrRecord";

export type EstimateRecord = {
  name: string;
  sub: EstimateRecord[];
  effort: StrRecord<number>;
  id: string;
};

export enum EffortType {
  PERCENT = "PERCENT",
  QUANTITY = "QUANTITY",
  CALCULATED = "CALCULATED",
}

export type EstimateConfig = {
  columns: {
    name: string;
    type: EffortType;
    calculation?: string; // for now, eval'd js ⚠️ security issue
  }[];
};

export type EstimateState = {
  estimates: EstimateRecord[];
  config: EstimateConfig;
};
