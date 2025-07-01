import TopProduct from "../models/TopProduct.js";
import { shopifyApi } from "@shopify/shopify-api";

export async function storeTopProductsToday(session) {
  const client = new shopifyApi.clients.Graphql({ session });
  const today = new Date().toISOString().split("T")[0];
  const shop = session.shop;

  const query = `
    {
      orders(first: 100, query: "created_at:>=${today}") {
        edges {
          node {
            lineItems(first: 10) {
              edges {
                node {
                  quantity
                  product {
                    id
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          originalSrc
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await client.query({ data: query });

  const countMap = {};

  for (const order of response.body.data.orders.edges) {
    for (const item of order.node.lineItems.edges) {
      const product = item.node.product;
      const quantity = item.node.quantity;

      if (!product) continue;

      const productId = product.id;

      if (!countMap[productId]) {
        countMap[productId] = {
          shop,
          productId,
          title: product.title,
          handle: product.handle,
          image: product.images.edges[0]?.node.originalSrc || "",
          totalSold: 0,
          date: today,
        };
      }

      countMap[productId].totalSold += quantity;
    }
  }

  const top8 = Object.values(countMap)
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 8);

  await TopProduct.deleteMany({ shop, date: today });
  await TopProduct.insertMany(top8);

  console.log(`✅ Top 8 stored for shop: ${shop}`);
  return top8;
}
