# Ads Service

The Ads service loads a set of ads based on the category when the service is initialized and then serves ads based on the products in the cart.
The `adCategories` is a readonly variable populated at the initialization of the service. This allows us to access the ads without lock statements allowing concurrent calls to the service.

```bal
type AdCategory record {|
    readonly string category;
    stubs:Ad[] ads;
|};

private final readonly & table<AdCategory> key(category) adCategories;

function init() {
    self.adCategories = loadAds().cloneReadOnly();

    stubs:Ad[] ads = [];
    foreach var category in self.adCategories {
        ads.push(...category.ads);
    }
    self.allAds = ads.cloneReadOnly();
}

remote function GetAds(stubs:AdRequest request) returns stubs:AdResponse|error {
    stubs:Ad[] ads = [];
    foreach string category in request.context_keys {
        AdCategory? adCategory = self.adCategories[category];
        if adCategory !is () {
            ads.push(...adCategory.ads);
        }
    }
    if ads.length() == 0 {
        ads = check self.getRandomAds();
    }
    return {ads};
}
```
