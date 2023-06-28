# Recommendation Service

`Recommendation Service` simply calls the `Catalog Service` and returns a set of product which is not included in the user's cart. For this filtration also we make use of query expressions.

```bal
remote function ListRecommendations(stubs:ListRecommendationsRequest request)
      returns stubs:ListRecommendationsResponse|error {

    stubs:ListProductsResponse|grpc:Error listProducts = self.catalogClient->ListProducts({});
    if listProducts is grpc:Error {
        return error grpc:InternalError("Failed to get list of products from catalog service", listProducts);
    }

    return {
        product_ids: from stubs:Product product in listProducts.products
            let string productId = product.id
            where request.product_ids.indexOf(productId) is ()
            limit 5
            select productId
    };
}
```