import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

export default function Profile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <div>
            {user ? (
                <div>Hello to profile {user.name}</div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
