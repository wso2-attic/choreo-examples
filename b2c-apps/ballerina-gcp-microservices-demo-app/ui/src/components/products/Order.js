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
import PropTypes from 'prop-types';

const Order = (props) => {
    const orderId = props.orderId;
    const shippingTrackingId = props.shippingTrackingId;
    const totalPaid = props.totalPaid;

    return (
        <>
            <main role="main" className="order">

                <section className="container order-complete-section">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3>
                                Your order is complete!
                            </h3>
                        </div>
                        <div className="col-12 text-center">
                            <p>We&apos;ve sent you a confirmation email.</p>
                        </div>
                    </div>
                    <div className="row border-bottom-solid padding-y-24">
                        <div className="col-6 pl-md-0">
                            Confirmation #
                        </div>
                        <div className="col-6 pr-md-0 text-right">
                            {orderId}
                        </div>
                    </div>
                    <div className="row border-bottom-solid padding-y-24">
                        <div className="col-6 pl-md-0">
                            Tracking #
                        </div>
                        <div className="col-6 pr-md-0 text-right">
                            {shippingTrackingId}
                        </div>
                    </div>
                    <div className="row padding-y-24">
                        <div className="col-6 pl-md-0">
                            Total Paid
                        </div>
                        <div className="col-6 pr-md-0 text-right">
                            {totalPaid}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <a className="cymbal-button-primary" href="/" role="button">
                                Continue Shopping
                            </a>
                        </div>
                    </div>
                </section>

            </main>

        </>
    );
};

Order.propTypes = {
    orderId: PropTypes.string.isRequired,
    shippingTrackingId: PropTypes.string.isRequired,
    totalPaid: PropTypes.string.isRequired
};

export default Order;
