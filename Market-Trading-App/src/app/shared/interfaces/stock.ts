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
 to string somewhere when displaying and needing to add a symbol 
 
 
 Also could have a full amount of info being returned from api, and then a different model which is specifically for table display? 
 Could also just be done in the component that is passing the data to the table 
 */
