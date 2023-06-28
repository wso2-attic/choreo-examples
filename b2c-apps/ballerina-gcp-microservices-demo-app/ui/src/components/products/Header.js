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

import CurrencyOption from './CurrencyOption';
import { useState, useEffect, useRef } from 'react';
import { getMetadata, changeCurrency } from '../../lib/api';

const whitelistedCurrencies = ['USD', 'CAD', 'JPY', 'TRY', 'EUR', 'GBP'];

const Header = () => {
    const [myData, setMyData] = useState({
        cartSize: 0,
        currencies: whitelistedCurrencies,
        isCymbalBrand: false,
        userCurrency: ['USD', '$']
    });

    useEffect(() => {
        getMetadata().then((data) => {
            setMyData(data);
        });
    }, []);

    let image = <img src={process.env.PUBLIC_URL + '/static/icons/Hipster_NavLogo.svg'} alt="" className="top-left-logo" />;
    if (myData.isCymbalBrand) {
        image = <img src={process.env.PUBLIC_URL + '/static/icons/Cymbal_NavLogo.svg'} alt="" className="top-left-logo-cymbal" />;
    }

    const items = [];
    for (const value of myData.currencies.values()) {
        if (whitelistedCurrencies.includes(value)) {
            items.push(<CurrencyOption userCurrency={value} />);
        }
    }

    const currencyRef = useRef();

    async function changeCurrencyFormHandler(event) {
        event.preventDefault();

        const currency = currencyRef.current.value;

        const data = {
            currency
        };
        const response = await changeCurrency(data);
        setMyData(response);
        window.location.reload(true);
    }

    const currencyInfo = (
        <div className="h-controls">
            <div className="h-control">
                <span className="icon currency-icon"> {myData.userCurrency[1]}</span>
                <form method="POST" className="controls-form" id="currency_form" onChange={changeCurrencyFormHandler}>
                    <select name="currency_code" ref={currencyRef} value={myData.userCurrency[0]}>
                        {items}
                    </select>
                </form>
                <img src={process.env.PUBLIC_URL + '/static/icons/Hipster_DownArrow.svg'} alt="" className="icon arrow" />
            </div>
        </div>
    );
    let cartSize;
    if (myData.cartSize) {
        cartSize = <span className="cart-size-circle">{myData.cartSize}</span>;
    }
    return (
        <header>
            <div className="navbar">
                <div className="container d-flex justify-content-center">
                    <div className="h-free-shipping">Free shipping with $75 purchase!</div>
                </div>
            </div>
            <div className="navbar sub-navbar">
                <div className="container d-flex justify-content-between">
                    <a href="/" className="navbar-brand d-flex align-items-center">
                        {image}
                    </a>
                    <div className="controls">
                        {currencyInfo}
                        <a href="/cart" className="cart-link">
                            <img src={process.env.PUBLIC_URL + '/static/icons/Hipster_CartIcon.svg'} alt="Cart icon" className="logo" title="Cart" />
                            {cartSize}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
