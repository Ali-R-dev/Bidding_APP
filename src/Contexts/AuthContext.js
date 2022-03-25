import react, { useContext, useState, useEffect } from 'react'
import { loginProvider } from '../services/loginService'

const AuthContext = react.createContext();

export function useAuth() {
    return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {

    const defaultCredentials = {
        role: "", userId: '', userName: ''
    }

    const [credentials, setCredentials] = useState(() => {

        const credentials = localStorage.getItem('credentials');

        if (credentials != null) return JSON.parse(credentials)

        return defaultCredentials
    })



    const [headerTitle, setHEaderTitle] = useState('')

    useEffect(() => {

        localStorage.setItem('credentials', JSON.stringify(credentials))

    }, [credentials])


    const setAuth = async (userObj) => {

        try {
            const cred = await loginProvider(userObj)
            const { userId, role, userName } = cred;
            if (userId && role && userName)
                setCredentials(cred)
            return true;
        } catch (error) {
            return undefined
        }
    }
    const logOut = () => {
        setCredentials({ role: "", userId: '', userName: '' })
    }

    const isAuth = () => {
        return credentials.userId == "" && credentials.role == "" ? false : true;
    }
    const setPageTitle = (title) => {
        setHEaderTitle(title)
    }

    return (
        <AuthContext.Provider value={{
            credentials,
            setAuth,
            isAuth,
            logOut,
            setPageTitle,
            headerTitle,

        }}>
            {children}
        </AuthContext.Provider>
    )
}   