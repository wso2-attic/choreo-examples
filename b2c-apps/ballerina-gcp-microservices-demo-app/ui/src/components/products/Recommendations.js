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
import Recommendation from './Recommendation';

const Recommendations = (props) => {
    console.log(props);
    const values = [props.values];
    const items = [];

    for (let index = 0; index < values[0].length; ++index) {
        const value = values[0][index];
        items.push(<Recommendation key={index} id={value.id} picture={value.picture} name={value.name} />);
    }

    return (
        <section className="recommendations">
            <div className="container">
                <div className="row">
                    <div className="col-xl-10 offset-xl-1">
                        <h2>You May Also Like</h2>
                        <div className="row">
                            {items}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

Recommendations.propTypes = {
    values: PropTypes.arrayOf(PropTypes.shape({
        categories: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
    }))
};

export default Recommendations;
