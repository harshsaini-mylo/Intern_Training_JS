
const orders = [
  {
    id: "o1",
    customer: "Aarav",
    items: [
      { sku: "K01", qty: 1, price: 1500 },
      { sku: "M01", qty: 2, price: 800 },
    ],
    status: "delivered",
  },

  {
    id: "o2",
    customer: "Priya",
    items: [{ sku: "N01", qty: 5, price: 120 }],
    status: "pending",
  },

  {
    id: "o3",
    customer: "Rahul",
    items: [
      { sku: "P01", qty: 3, price: 25 },
      { sku: "K01", qty: 1, price: 1500 },
    ],
    status: "delivered",
  },

  {
    id: "o4",
    customer: "Aarav",
    items: [{ sku: "M01", qty: 1, price: 800 }],
    status: "cancelled",
  },

  {
    id: "o5",
    customer: "Sneha",
    items: [
      { sku: "N01", qty: 2, price: 120 },
      { sku: "P01", qty: 4, price: 25 },
    ],
    status: "delivered",
  },
];

const orderTotal = ({ items }) =>
  items.reduce((sum, { qty, price }) => sum + qty * price, 0);

//totalRevenue 
const totalRevenue = (orders) =>
  orders
    .filter(({ status }) => status === "delivered")
    .reduce((sum, order) => sum + orderTotal(order), 0);

// revenueByCustomer
const revenueByCustomer = (orders) =>
  orders
    .filter(({ status }) => status === "delivered")
    .reduce(
      (acc, order) => ({
        ...acc,
        [order.customer]:
          (acc[order.customer] ?? 0) + orderTotal(order),
      }),
      {}
    );

// topCustomer
const topCustomer = (orders) => {
  const revenue = revenueByCustomer(orders);

  return Object.entries(revenue).reduce(
    (top, current) => (current[1] > top[1] ? current : top)
  )[0];
};

//  uniqueSkusSold
const uniqueSkusSold = (orders) =>
  new Set(
    orders
      .filter(({ status }) => status === "delivered")
      .flatMap(({ items }) => items.map(({ sku }) => sku))
  );

//averageOrderValue
const averageOrderValue = (orders, status) => {
  const filtered = orders.filter((o) => o.status === status);

  return (
    filtered.reduce((sum, order) => sum + orderTotal(order), 0) /
    (filtered.length || 1)
  );
};


// Example

console.log(totalRevenue(orders));

console.log(revenueByCustomer(orders));

console.log(topCustomer(orders));

console.log(uniqueSkusSold(orders));

console.log(averageOrderValue(orders, "delivered"));

