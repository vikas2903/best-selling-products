import {
  Box,
  // Card,
  Layout,
  // Link,
  // List,
  Page,
  // Text,
  BlockStack,
  MediaCard,
  InlineGrid,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function AdditionalPage() {
  return (
    <Page fullWidth>
      <TitleBar title="Products" />
      <Layout>
        <Layout.Section>
          {/* <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                  removeUnderline
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;NavMenu&gt;</Code> component found
                in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card> */}
          <BlockStack gap="100">

            <InlineGrid columns={{ xs: 4, md: 4 }} gap="200">
            <MediaCard
              portrait
              title="Getting Started"
              // primaryAction={{
              //   content: "Learn about getting started",
              //   onAction: () => {},
              // }}
              // popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
description="Learn how to get started with the Shopify App Bridge and Polaris components to build your app."
            >
          
              <img
                alt=""
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"/> </MediaCard>
            
            </InlineGrid>
           
          </BlockStack>
        </Layout.Section>

        {/* <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section> */}
      </Layout>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
