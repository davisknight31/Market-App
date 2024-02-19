export interface Stock {
  name: string;
  price: string; //should be number to be type safe and converted elsewhere
  percent: string; //should be number to be type safe and converted elsewhere
  test1: string;
  test2: string;
  test3: string;
}

/* probably should keep this type safe from background,
 and have some shared conversion method which converts
 to string somewhere when displaying and needing to add a symbol */
