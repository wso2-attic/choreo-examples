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

const Product = (props) => {
    console.log(props);
    return (
        <div className="col-md-4 hot-product-card">
            <a href={`/product/${props.id}`}>
                <img alt="" src={`${process.env.PUBLIC_URL + props.picture}`} />
                <div className="hot-product-card-img-overlay" />
            </a>
            <div>
                <div className="hot-product-card-name">{props.name}</div>
                <div className="hot-product-card-price">{props.price}</div>
            </div>
        </div>
    );
};

Product.propTypes = {
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
};

export default Product;
