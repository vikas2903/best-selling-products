import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Card, IndexTable, Text } from "@shopify/polaris";
import { authenticate } from "../shopify.server.js"; 
import { TitleBar } from "@shopify/app-bridge-react";
// 🟢 Loader function
export const loader = async ({ request }) => {
  // Authenticate to get session
  await authenticate.admin(request);
  const { session } = await authenticate.admin(request);

  // Get shop from session
  const shop = session.shop;

  // Get yesterday's date dynamically
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  // API endpoint
  const endpoint = `https://shopify-wishlist-app-mu3m.onrender.com/api/data?shop=sazeracstore.myshopify.com&date=${date}`;


  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Failed to fetch product data");

  const data = await res.json();

  // Sort top 8 products by views
  const sortedProducts = (data.products || [])
    .sort((a, b) => b.views - a.views)
    .slice(0, 50);

  return json({ products: sortedProducts, shop, date });
};

// 🟢 React component
export default function TopProductsPage() {
  const { products, shop, date } = useLoaderData();

  const rowMarkup = products.map((product, index) => (
    <IndexTable.Row id={product._id} key={product._id} position={index}>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold">{product.productId}</Text>
      </IndexTable.Cell>
       <IndexTable.Cell>{product.productHandle}</IndexTable.Cell>
      <IndexTable.Cell>{product.views}</IndexTable.Cell>
      <IndexTable.Cell>{product.addToCartClicks}</IndexTable.Cell>
      <IndexTable.Cell>{product.checkoutClicks}</IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page fullWidth>
      <TitleBar title="Top 50 Products by Views" />
    <Card>
      <Text as="h2" variant="headingMd">
        Top 50 Products by Views — {date}
      </Text>
      <Text as="p" variant="bodySm" color="subdued">
        Shop: {shop}
      </Text>
      
      <IndexTable
        resourceName={{ singular: "product", plural: "products" }}
        itemCount={products.length}
        headings={[
          { title: "Product Id" },
           { title: "Handle" },
          { title: "Views" },
          { title: "Add to Cart" },
          { title: "Checkout" },
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
    </Page>
  );
}
