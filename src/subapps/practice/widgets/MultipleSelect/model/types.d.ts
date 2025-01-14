export interface ISelectItem {
  name: string;
  value: ISelectItemValue;
}

export type ISelectItemValue = string | number | boolean | undefined