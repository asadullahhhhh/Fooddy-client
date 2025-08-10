import React, { use } from 'react';
import { AuthContext } from '../../Context/ContextProvider';

const Loading = () => {

  const {darkLight} = use(AuthContext)

    return (
     <div
  className={`${darkLight ? "dark" : ""} flex dark:bg-gray-900 justify-center items-center min-h-screen`}
>
  <span className="loading loading-bars loading-xl text-gray-800 dark:text-gray-200"></span>
</div>

    );
};

export default Loading;