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
import { useEffect, useRef } from 'react';
import Header from '../components/products//Header';
import Footer from '../components/products/Footer';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleProduct, addProductToCart } from '../lib/api';
import Recommendations from '../components/products/Recommendations';
import Ad from '../components/products/Ad';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
    const params = useParams();
    const quantityRef = useRef();
    const navigate = useNavigate();

    const { productId } = params;

    function submitFormHandler(event) {
        event.preventDefault();
        const quantity = quantityRef.current.value;
        addProductToCart({ quantity: parseInt(quantity), productId }).finally(() => {
            navigate('/cart');
        });
    }

    const { sendRequest, status, data: loadedProduct, error } = useHttp(
        getSingleProduct,
        true
    );

    useEffect(() => {
        sendRequest(productId);
    }, [sendRequest, productId]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className='centered focused'>{error}</p>;
    }

    const data = loadedProduct;

    const product = data.product;
    const recommendations = data.recommendations;

    return (
        <>
            <Header />
            <div className="local">
                <span className="platform-flag">
                    local
                </span>
            </div>
            <main role="main">
                <div className="h-product container">
                    <div className="row">
                        <div className="col-md-6">
                            <img className="product-image" alt="" src={`${process.env.PUBLIC_URL + product.picture}`} />
                        </div>
                        <div className="product-info col-md-5">
                            <div className="product-wrapper">

                                <h2>{product.id}</h2>
                                <p className="product-price">{product.price}</p>
                                <p>{product.description}</p>

                                <form onSubmit={submitFormHandler}>
                                    <input type="hidden" name="product_id" value={product.id} />
                                    <div className="product-quantity-dropdown">
                                        <select name="quantity" id="quantity" ref={quantityRef}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>10</option>
                                        </select>
                                        <img src={process.env.PUBLIC_URL + '/static/icons/Hipster_DownArrow.svg'} alt="" />
                                    </div>
                                    <button type="submit" className="cymbal-button-primary">Add To Cart</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {recommendations.length > 0 &&
                        <Recommendations values={recommendations} />
                    }
                </div>
                <div className="ad">
                    <Ad redirect_url={data.ad.redirect_url} text={data.ad.text} />
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Product;
