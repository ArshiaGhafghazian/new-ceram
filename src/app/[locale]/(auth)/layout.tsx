import React from "react";

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=''>
            {children}


        </div>
    )
}

export default AuthLayout;
