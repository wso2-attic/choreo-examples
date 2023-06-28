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

const Recommendation = (props) => {
    return (
        <div className="col-md-3">
            <div>
                <a href={`/product/${props.id}`}>
                    <img alt="" src={process.env.PUBLIC_URL + props.picture} />
                </a>
                <div>
                    <h5>
                        {props.name}
                    </h5>
                </div>
            </div>
        </div>
    );
};

Recommendation.propTypes = {
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Recommendation;
