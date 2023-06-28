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

import { useReducer, useCallback } from 'react';

function httpReducer(state, action) {
    if (action.type === 'SEND') {
        return {
            data: null,
            error: null,
            status: 'pending'
        };
    }

    if (action.type === 'SUCCESS') {
        return {
            data: action.responseData,
            error: null,
            status: 'completed'
        };
    }

    if (action.type === 'ERROR') {
        return {
            data: null,
            error: action.errorMessage,
            status: 'completed'
        };
    }

    return state;
}

function useHttp(requestFunction, startWithPending = false) {
    const [httpState, dispatch] = useReducer(httpReducer, {
        status: startWithPending ? 'pending' : null,
        data: null,
        error: null
    });

    const sendRequest = useCallback(
        async function (requestData) {
            dispatch({ type: 'SEND' });
            try {
                const responseData = await requestFunction(requestData);
                dispatch({ type: 'SUCCESS', responseData });
            } catch (error) {
                dispatch({
                    type: 'ERROR',
                    errorMessage: error.message || 'Something went wrong!'
                });
            }
        },
        [requestFunction]
    );

    return {
        sendRequest,
        ...httpState
    };
}

export default useHttp;
