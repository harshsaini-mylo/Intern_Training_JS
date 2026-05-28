const orderTotal = ({ items }) =>
  items.reduce((sum, { qty, price }) => sum + qty * price, 0);

export const totalRevenue = (orders) =>
  orders
    .filter(({ status }) => status === "delivered")
    .reduce((sum, order) => sum + orderTotal(order), 0);

export const revenueByCustomer = (orders) =>
  orders
    .filter(({ status }) => status === "delivered")
    .reduce((acc, order) => ({
      ...acc,
      [order.customer]:
        (acc[order.customer] ?? 0) + orderTotal(order),
    }), {});

export const topCustomer = (orders) => {
  const revenue = revenueByCustomer(orders);
  const entries = Object.entries(revenue);
  if (entries.length === 0) return null;

  return entries.reduce(
    (top, current) => (current[1] > top[1] ? current : top)
  )[0];
};

export const uniqueSkusSold = (orders) =>
  new Set(
    orders
      .filter(({ status }) => status === "delivered")
      .flatMap(({ items }) => items.map(({ sku }) => sku))
  );

export const averageOrderValue = (orders, status) => {
  const filtered = orders.filter((o) => o.status === status);
  if (filtered.length === 0) return 0;

  return (
    filtered.reduce((sum, order) => sum + orderTotal(order), 0) /
    filtered.length
  );
};
