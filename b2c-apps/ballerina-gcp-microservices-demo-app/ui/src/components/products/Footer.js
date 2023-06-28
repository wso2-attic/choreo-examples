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

import { useCookies } from 'react-cookie';

const Footer = (props) => {
    const [userIdCookie] = useCookies(['userId']);
    const userId = userIdCookie.userId;

    return (
        <footer className="py-5">
            <div className="footer-top">
                <div className="container footer-social">
                    <p className="footer-text">This website is hosted for demo purposes only. It is not an actual shop.</p>
                    <p className="footer-text">This demo was created based on the <a href='https://github.com/GoogleCloudPlatform/microservices-demo'>GCP microservices sample</a></p>
                    <p className="footer-text">Please find the source code <a href='https://github.com/ballerina-guides/gcp-microservices-demo'>here</a></p>
                    <p className="footer-text">
                        <small>session-id: {userId}</small>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
