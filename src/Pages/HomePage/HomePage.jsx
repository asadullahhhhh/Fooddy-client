import React, { use } from 'react';
import { AuthContext } from '../../Context/ContextProvider';

const HomePage = () => {

    const {setIsOpen, user} = use(AuthContext)

    return (
        <div className='h-screen'>
            <h2>I am home page</h2>
        </div>
    );
};

export default HomePage;