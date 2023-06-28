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

import { Link } from 'react-router-dom';

import classes from './NoQuotesFound.module.css';

const NoQuotesFound = () => {
    return (
        <div className={classes.noquotes}>
            <p>No quotes found!</p>
            <Link className='btn' to='/new-quote'>Add a Quote</Link>
        </div>
    );
};

export default NoQuotesFound;
