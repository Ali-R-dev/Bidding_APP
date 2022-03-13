import axios from "axios"

const baseUrl = "http://localhost:3001/api"

export const loginProvider = async (userObj) => {
    const { userId, role } = userObj
    const result = await axios.get(`${baseUrl}/login`, {
        headers: {
            'Auth-userid': userId,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    ).then(res => res.data)
    return result;
}