# Product Catalog Service

The Catalog Service maintains a list of products available in the store. The product list will be read from JSON and converted to a readonly array of `Product` when the service is initialized. The `Catalog Service` has the Search Product capability. This feature is implemented using ballerina query expressions. It allows you to write SQL like queries to filter data from the array. You can find more details about query expressions in this [blog](https://dzone.com/articles/language-integrated-queries-in-ballerina).

```bal
configurable string productJsonPath = "./resources/products.json";

@grpc:Descriptor {value: DEMO_DESC}
service "ProductCatalogService" on new grpc:Listener(9091) {
    private final stubs:Product[] & readonly products;

    function init() returns error? {
        json|error productsJson = io:fileReadJson(productJsonPath);
        self.products = check parseProductJson(productsJson);
    }

    remote function ListProducts(stubs:Empty request) returns stubs:ListProductsResponse {
        return {products: self.products};
    }

    remote function GetProduct(stubs:GetProductRequest request) returns stubs:Product|grpc:NotFoundError|error {
        foreach stubs:Product product in self.products {
            if product.id == request.id {
                return product;
            }
        }
        return error grpc:NotFoundError(string `no product with ID ${request.id}`);
    }

    remote function SearchProducts(stubs:SearchProductsRequest request) returns stubs:SearchProductsResponse {
        return {
            results: from stubs:Product product in self.products
                where isProductRelated(product, request.query)
                select product
        };
    }
}
```
