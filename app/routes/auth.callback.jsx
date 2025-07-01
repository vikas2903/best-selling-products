import { json } from "@remix-run/node";
import Shop from "../models/Shop.js";
import { shopify } from "../shopify.server.js";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  try {
    const session = await shopify.auth.validateAuthCallback(request, searchParams);

    await Shop.findOneAndUpdate(
      { shop: session.shop },
      {
        shop: session.shop,
        accessToken: session.accessToken, 
        scope: session.scope,
        installedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return json({ message: "Shop credentials saved successfully" });
  } catch (error) {
    console.error("OAuth callback error:", error);
    return json({ error: "Auth error vikas" }, { status: 500 });
  }
};
