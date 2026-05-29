import { orders } from "./data.js";
import {
  totalRevenue,
  revenueByCustomer,
  topCustomer,
  uniqueSkusSold,
  averageOrderValue,
} from "./analytics.js";

console.log("Revenue:", totalRevenue(orders));
console.log("Revenue by customer:", revenueByCustomer(orders));
console.log("Top customer:", topCustomer(orders));
console.log("Unique skus sold:", [...uniqueSkusSold(orders)].join(", "));
console.log(
  "Average delivered order value:",
  averageOrderValue(orders, "delivered")
);
