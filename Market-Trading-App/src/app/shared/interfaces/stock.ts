export interface Stock {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  close: number;
  high: number;
  low: number;
  count?: number;
  open: number;
  time?: Date;
  volume?: number;
  volumeWeighted?: number;
}

export interface StockOld {
  name: string;

  //'current price'
  c: string; //should be number to be type safe and converted elsewhere

  //'change'
  d: string; //should be number to be type safe and converted elsewhere

  //'percent change'
  dp: string;

  //'high price of day'
  h: string;

  //'low price of day'
  l: string;

  //'open price of day'
  o: string;

  //'previous close price'
  pc: string;
}

/* probably should keep this type safe from background,
 and have some shared conversion method which converts
 to string somewhere when displaying and needing to add a symbol 
 
 
 Also could have a full amount of info being returned from api, and then a different model which is specifically for table display? 
 Could also just be done in the component that is passing the data to the table 
 */
