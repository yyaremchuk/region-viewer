export interface ICountry {
  name: string;
  capital: string;
  population: number;
  currencies: Array<{ code: string }>;
  flag: string;
}
