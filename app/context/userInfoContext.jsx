import React from 'react';

const UserInfoContext = React.createContext();

export function UserInfoProvider({ children }) {
    const [userInfo, setUserInfo] = React.useState(30);
    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
}

export function useUserInfoContext() {
    const context = React.useContext(UserInfoContext);
    if (!context)
        throw new Error("useUserInfo deve estar dentro de um UserInfoProvider");
    return context;
}
