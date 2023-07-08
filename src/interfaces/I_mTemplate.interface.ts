export interface I_mTemplate_Options {
  refreshOnEach?: boolean;
  replaceCondition?: () => boolean;
}

export interface I_mTemplate extends I_mTemplate_Options {
  target: string;
}
