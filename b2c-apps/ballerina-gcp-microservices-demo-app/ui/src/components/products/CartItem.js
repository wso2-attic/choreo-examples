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

const CartItem = (props) => {
    return (
        <div className="row cart-summary-item-row">
            <div className="col-md-4 pl-md-0">
                <a href={`/product/${props.id}`}>
                    <img className="img-fluid" alt="" src={process.env.PUBLIC_URL + props.picture} />
                </a>
            </div>
            <div className="col-md-8 pr-md-0">
                <div className="row">
                    <div className="col">
                        <h4>{props.name}</h4>
                    </div>
                </div>
                <div className="row cart-summary-item-row-item-id-row">
                    <div className="col">
                        SKU #{props.id}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Quantity: {props.quantity}
                    </div>
                    <div className="col pr-md-0 text-right">
                        <strong>
                            {props.price}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
};

export default CartItem;
