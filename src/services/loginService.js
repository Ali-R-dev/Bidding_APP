import axios from "axios"

const baseUrl = "http://localhost:3001/api"

const header = (userId, role) => {

    return {
        'Auth-userid': userId,
        'Auth-role': role,
        'Content-Type': 'application/json'
    }

}

export const loginProvider = async (userObj) => {
    const { userId, role } = userObj
    const result = await axios.get(`${baseUrl}/login`, {
        headers: header(userId, role)
    }
    ).then(res => res.data)
    return result;
}