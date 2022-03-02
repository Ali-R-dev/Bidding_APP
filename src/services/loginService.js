import axios from "axios"

const baseUrl = "http://localhost:3001/api"

export const loginProvider = async (userObj) => {
    const { id, role } = userObj
    const result = await axios.get(`${baseUrl}/login`, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    ).then(res => res.data)
    return result;
}