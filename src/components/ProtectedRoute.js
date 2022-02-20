import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <>hello</>
        //     <Route {...rest}
        //         render={
        //             (props) => {
        //                 if (isAuth())
        //                     return <Component {...props} />
        //                 else return <Redirect to={
        //                     {
        //                         pathname: "/"
        //                     }
        //                 } />
        //             }} />
    )
}
