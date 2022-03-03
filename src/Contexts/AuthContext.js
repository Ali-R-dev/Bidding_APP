import react, { useContext, useState, useEffect } from 'react'
import { loginProvider } from '../services/loginService'

const AuthContext = react.createContext();

export function useAuth() {
    return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {

    const defaultCredentials = {
        id: '', role: ''
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
            const { id, role } = cred;
            if (id && role)
                setCredentials(cred)
            return true;
        } catch (error) {
            return undefined
        }
    }
    const logOut = () => {
        setCredentials({ id: "", role: "" })
    }

    const isAuth = () => {
        return credentials.id == "" && credentials.role == "" ? false : true;
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
            headerTitle
        }}>
            {children}
        </AuthContext.Provider>
    )
}   