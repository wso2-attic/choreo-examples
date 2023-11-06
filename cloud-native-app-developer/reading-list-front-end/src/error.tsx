// Copyright (c) 2023, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.

// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License.

import React from "react";
import { useLocation } from 'react-router-dom';


export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ErrorPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Access individual query parameters
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  return (
    <div className="flex h-[calc(60vh)] items-center justify-center p-5 w-[calc(60vw)] bg-white bg-opacity-20">
      <div className="text-center">
        <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[40px]">5XX - Server error</h1>
        <p className="text-slate-800 mt-5 lg:text-[20px]">Oops, something went wrong</p>
        <p className="text-slate-600 mt-5 lg:text-m">Error Code : {code}<br />Error Description: {message}</p>
        <a
          href="/"
          className="inline-block p-2 bg-opacity-20 mt-8 text-sm font-medium text-white bg-black rounded hover:bg-black"
        >
          Go Back Home
        </a>
      </div>
    </div>
  )
}
