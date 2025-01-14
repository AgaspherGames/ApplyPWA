export interface IArea {
  id: number;
  name: string;
  cities: ICity[];
}

export interface ICity {
  id: number;
  name: string;
}
