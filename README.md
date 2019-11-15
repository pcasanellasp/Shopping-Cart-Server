# User Stories

- User can create Products, Categories, Providers, Lists and Bundles
- User can insert products on Lists
- User can insert products on Bundles
- User can insert bundles on Lists
- User can register a product into 
 


# Products

- Name
- Category
- Link
- Brand
- Weight
- Price
- Provider
- Alternatives

# Categories

- Name
- Color

# Providers

- Name

# Lists

- Name
- Products [{ref: Product, Status, Quantity}]
- Status ('started', 'canceled', 'completed')
- CompletedAt

# Bundles

- Name
- Products [{ref: Product, Quantity}]

# Reports
- By Date