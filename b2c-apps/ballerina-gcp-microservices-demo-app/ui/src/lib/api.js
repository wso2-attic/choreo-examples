/*
 *  Copyright (c) 2022, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 *  WSO2 LLC. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 */

const FRONTEND_SVC_URL = process.env.REACT_APP_FRONTEND_SVC_URL;
const FRONTEND_API_KEY = process.env.REACT_APP_FRONTEND_API_KEY;

export async function getAllQuotes() {
    const response = await fetch(`${FRONTEND_SVC_URL}/quotes.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch quotes.');
    }

    const transformedQuotes = [];

    for (const key in data) {
        const quoteObj = {
            id: key,
            ...data[key]
        };

        transformedQuotes.push(quoteObj);
    }

    return transformedQuotes;
}

export async function getHomePage() {
    const response = await fetch(`${FRONTEND_SVC_URL}`, {
        headers: {
            'API-Key': FRONTEND_API_KEY
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not get home page.');
    }

    return data;
}

export async function getSingleProduct(productId) {
    const response = await fetch(`${FRONTEND_SVC_URL}/product/${productId}`, {
        headers: {
            'API-Key': FRONTEND_API_KEY
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not get the product.');
    }

    return data;
}

export async function addProductToCart(requestData) {
    const response = await fetch(`${FRONTEND_SVC_URL}/cart/`, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'API-Key': FRONTEND_API_KEY,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not product to cart.');
    }

    return { };
}

export async function getCartPage() {
    const response = await fetch(`${FRONTEND_SVC_URL}/cart`, {
        headers: {
            'API-Key': FRONTEND_API_KEY
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not get the cart.');
    }

    return data;
}

export async function checkout(requestData) {
    const response = await fetch(`${FRONTEND_SVC_URL}/cart/checkout`, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'API-Key': FRONTEND_API_KEY,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not checkout.');
    }

    return data;
}

export async function changeCurrency(requestData) {
    const response = await fetch(`${FRONTEND_SVC_URL}/setCurrency`, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'API-Key': FRONTEND_API_KEY,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not change currency.');
    }

    return data;
}

export async function getMetadata() {
    const response = await fetch(`${FRONTEND_SVC_URL}/metadata`, {
        headers: {
            'API-Key': FRONTEND_API_KEY
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not get metadata.');
    }

    return data;
}

export async function emptyCart() {
    const response = await fetch(`${FRONTEND_SVC_URL}/cart/empty`, {
        method: 'POST',
        headers: {
            'API-Key': FRONTEND_API_KEY
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not empty the cart.');
    }

    return data;
}
