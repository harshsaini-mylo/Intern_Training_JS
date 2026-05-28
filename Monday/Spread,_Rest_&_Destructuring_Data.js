const products = [ 

  { id: 1, name: "Keyboard", price: 1500, tags: ["electronics", "accessory"] }, 

  { id: 2, name: "Mouse",    price:  800, tags: ["electronics", "accessory"] }, 

  { id: 3, name: "Notebook", price:  120, tags: ["stationery"]              }, 

  { id: 4, name: "Pen",      price:   25, tags: ["stationery"]              }, 

]; 

  //clone
const clone = obj => ({ ...obj });

//merge
const merge = (a, b) => ({ ...a, ...b });

//pick(obj, keys) -> return new object with only those keys
const pick = (obj, keys) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  );

//addTag(product, t) -> append tag without mutation
const addTag = ({ tags, ...product }, t) => ({
  ...product,
  tags: [...tags, t],
});

//Ex:-

console.log(clone(products[0])); //{ id: 1, name: 'Keyboard', price: 1500, tags: [ 'electronics', 'accessory' ] }

console.log(
  merge({ a: 1, b: 2 }, { b: 9, c: 3 })    //{ a: 1, b: 9, c: 3 }
);

console.log(
  pick(products[0], ["name", "price"]) //{ name: 'Keyboard', price: 1500 }
);

console.log(
  addTag(products[2], "premium")
);  //{
//   id: 3,
//   name: 'Notebook',
//   price: 120,
//   tags: [ 'stationery', 'premium' ]
// }