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

import { useEffect, useRef, useState } from 'react';
import Header from '../components/products/Header';
import Footer from '../components/products/Footer';
import CartItem from '../components/products/CartItem';
import ExpireOptionPicker from '../components/products/ExpireOptionPicker';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getCartPage, checkout, emptyCart } from '../lib/api';
import Recommendations from '../components/products/Recommendations';
import Order from '../components/products/Order';

const CartPage = () => {
    const [isSubmitted, setSubmitted] = useState({});
    const emailRef = useRef();
    const addressRef = useRef();
    const zipRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const countryRef = useRef();
    const cardNumberRef = useRef();
    const expireMonthRef = useRef();
    const expireYearRef = useRef();
    const cvvRef = useRef();

    async function submitFormHandler(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const address = addressRef.current.value;
        const zip = zipRef.current.value;
        const city = cityRef.current.value;
        const state = stateRef.current.value;
        const country = countryRef.current.value;
        const cardNumber = cardNumberRef.current.value;
        const expireMonth = expireMonthRef.current.value;
        const expireYear = expireYearRef.current.value;
        const cvv = cvvRef.current.value;

        const data = {
            email,
            streetAddress: address,
            zipCode: parseInt(zip),
            city,
            state,
            country,
            creditCardNumber: cardNumber,
            creditCardExpirationMonth: parseInt(expireMonth),
            creditCardExpirationYear: parseInt(expireYear),
            creditCardCvv: parseInt(cvv)
        };
        const data1 = await checkout(data);
        setSubmitted(data1);
    }

    const { sendRequest, status, data: cartData, error } = useHttp(
        getCartPage,
        true
    );

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    const handleEmptyCart = () => {
        emptyCart();
        sendRequest();
    };

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

    const data = cartData;
    const cart = data.items;

    const recommendations = data.recommendations;

    const shippingCost = data.shippingCost;
    const totalCost = data.totalCost;

    const cartItemsList = [];
    for (const [index, val] of cart.entries()) {
        const value = val.product;
        cartItemsList.push(
            <CartItem
                key={index}
                id={value.id}
                picture={value.picture}
                name={value.name}
                price={val.price}
                quantity={val.quantity}
            />
        );
    }

    const expireOptionList = [];
    for (const [index, value] of data.expirationYears.entries()) {
        expireOptionList.push(<ExpireOptionPicker key={index} year={value} />);
    }

    let cartBlock = (<section className="empty-cart-section">
        <h3>Your shopping cart is empty!</h3>
        <p>Items you add to your shopping cart will appear here.</p>
        <a className="cymbal-button-primary" href="/" role="button">Continue Shopping</a>
    </section>);

    if (cart.length > 0) {
        cartBlock = (
            <section className="container">
                <div className="row">
                    <div className="col-lg-6 col-xl-5 offset-xl-1 cart-summary-section">
                        <div className="row mb-3 py-2">
                            <div className="col-4 pl-md-0">
                                <h3>Cart ({cart.length})</h3>
                            </div>
                            <div className="col-8 pr-md-0 text-right">
                                <button className="cymbal-button-secondary cart-summary-empty-cart-button" onClick={handleEmptyCart}>
                                    Empty Cart
                                </button>
                                <a className="cymbal-button-primary" href="/" role="button">
                                    Continue Shopping
                                </a>
                            </div>
                        </div>
                        {cartItemsList}
                        <div className="row cart-summary-shipping-row">
                            <div className="col pl-md-0">Shipping</div>
                            <div className="col pr-md-0 text-right">{shippingCost}</div>
                        </div>
                        <div className="row cart-summary-total-row">
                            <div className="col pl-md-0">Total</div>
                            <div className="col pr-md-0 text-right">{totalCost}</div>
                        </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1 col-xl-4">
                        <form className="cart-checkout-form" onSubmit={submitFormHandler}>
                            <div className="row">
                                <div className="col">
                                    <h3>Shipping Address</h3>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col cymbal-form-field">
                                    <label htmlFor="email">E-mail Address</label>
                                    <input type="email" id="email"
                                        name="email" defaultValue="someone@example.com" required ref={emailRef} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col cymbal-form-field">
                                    <label htmlFor="streetAddress">Street Address</label>
                                    <input type="text" name="streetAddress"
                                        id="streetAddress" defaultValue="1600 Amphitheatre Parkway" required ref={addressRef} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col cymbal-form-field">
                                    <label htmlFor="zipCode">Zip Code</label>
                                    <input type="text"
                                        name="zipCode" id="zipCode" defaultValue="94043" required pattern="\d{4,5}" ref={zipRef} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col cymbal-form-field">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" id="city"
                                        defaultValue="Mountain View" required ref={cityRef} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-5 cymbal-form-field">
                                    <label htmlFor="state">State</label>
                                    <input type="text" name="state" id="state"
                                        defaultValue="CA" required ref={stateRef} />
                                </div>
                                <div className="col-md-7 cymbal-form-field">
                                    <label htmlFor="country">Country</label>
                                    <input type="text" id="country"
                                        placeholder="Country Name"
                                        name="country" defaultValue="United States" required ref={countryRef} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <h3 className="payment-method-heading">Payment Method</h3>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col cymbal-form-field">
                                    <label htmlFor="creditCardNumber">Credit Card Number</label>
                                    <input type="text" id="creditCardNumber"
                                        name="creditCardNumber"
                                        placeholder="0000-0000-0000-0000"
                                        defaultValue="4432-8015-6152-0454"
                                        required pattern="\d{4}-\d{4}-\d{4}-\d{4}" ref={cardNumberRef} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-5 cymbal-form-field">
                                    <label htmlFor="creditCardExpirationMonth">Month</label>
                                    <select name="creditCardExpirationMonth" id="creditCardExpirationMonth" ref={expireMonthRef}>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12" selected>December</option>
                                    </select>
                                    <img src={process.env.PUBLIC_URL + '/static/icons/Hipster_DownArrow.svg'} alt="" className="cymbal-dropdown-chevron" />
                                </div>
                                <div className="col-md-4 cymbal-form-field">
                                    <label htmlFor="creditCardExpirationYear">Year</label>
                                    <select name="creditCardExpirationYear" id="creditCardExpirationYear" ref={expireYearRef}>
                                        {expireOptionList}
                                    </select>
                                    <img src={process.env.PUBLIC_URL + '/static/icons/Hipster_DownArrow.svg'} alt="" className="cymbal-dropdown-chevron" />
                                </div>
                                <div className="col-md-3 cymbal-form-field">
                                    <label htmlFor="creditCardCvv">CVV</label>
                                    <input type="password" id="creditCardCvv"
                                        name="creditCardCvv" defaultValue="672" required pattern="\d{3}" ref={cvvRef} />
                                </div>
                            </div>

                            <div className="form-row justify-content-center">
                                <div className="col text-center">
                                    <button className="cymbal-button-primary" type="submit">
                                        Place Order
                                    </button>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>
            </section>
        );
    }
    let contents = (
        <main role="main" className="cart-sections">
            {cartBlock}
        </main>
    );

    if (Object.keys(isSubmitted).length !== 0) {
        contents = <Order orderId={isSubmitted.order.order_id} shippingTrackingId={isSubmitted.order.shipping_tracking_id} totalPaid={isSubmitted.totalPaid} />;
    }

    return (
        <>
            <Header />
            <div className="local">
                <span className="platform-flag">
                    local
                </span>
            </div>
            {contents}
            <div>
                {recommendations.length > 0 &&
                    <Recommendations values={recommendations} />
                }
            </div>

            <Footer />
        </>
    );
};

export default CartPage;
