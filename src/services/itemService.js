import axios from "axios"

const baseUrl = "http://localhost:3001/api"

const header = (userId, role) => {

    return {
        'Auth-userid': userId,
        'Auth-role': role,
        'Content-Type': 'application/json'
    }

}

export const GetItems = async ({ userId, role }, { page, search }) => {

    let queryStack = []

    if (page !== undefined) { queryStack.push(`page=${page}`) }

    if (search !== undefined && search !== '') { queryStack.push(`search=${search}`) }

    let query = queryStack.length > 0 ?
        queryStack.length > 1 ? "?" + queryStack.join('&') : "?" + queryStack[0]
        : '';


    const result = await axios.get(`${baseUrl}/items${query}`, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}

export const GetItemById = async (itemId, credentials) => {
    const { userId, role } = credentials

    const result = await axios.get(`${baseUrl}/items/${itemId}`, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}
export const CreateItem = async (item, credentials) => {
    const { userId, role } = credentials
    const result = await axios.post(`${baseUrl}/items`, item, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}

export const UpdateItem = async (itemId, item, credentials) => {
    const { userId, role } = credentials
    const result = await axios.put(`${baseUrl}/items/${itemId}`, item, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}

export const DeleteItem = async (itemId, credentials) => {
    const { userId, role } = credentials
    const result = await axios.delete(`${baseUrl}/items/${itemId}`, {
        headers: header(userId, role)
    }
    ).then(res => res.data);
    return result;
}

//---- bidding area ---- 

export const BidOnItem = async (itemId, bidAmount, credentials) => {

    const { userId, role } = credentials
    const result = await axios.put(`${baseUrl}/items/bidnow/${itemId}`, { 'bidAmount': bidAmount }, {
        headers: header(userId, role)
    }
    ).then(res => res.data);
    return result;
}
export const getBidsByItemId = async (itemId, credentials) => {

    const { userId, role } = credentials
    const result = await axios.get(`${baseUrl}/items/bids/${itemId}`, {
        headers: header(userId, role)
    }
    ).then(res => res.data);
    return result;
}
// /bids/: id

export const getUserHistory = async (credentials) => {

    const { userId, role } = credentials
    const result = await axios.get(`${baseUrl}/items/userhistory`, {
        headers: header(userId, role)
    }
    ).then(res => res.data);
    return result;
}

// ==============================================================
export const updateBot = async (botObj, credentials) => {

    const { userId, role } = credentials
    const result = await axios.put(`${baseUrl}/user/bots`, botObj,
        {
            headers: header(userId, role)
        }
    )
        .then(res => res.data);
    return result;
}
export const getBotByUserId = async (credentials) => {

    const { userId, role } = credentials
    const result = await axios.get(`${baseUrl}/user/bots`, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}
export const AutoBidToogle = async (itemId, setStatus, credentials) => {

    const { userId, role } = credentials
    const result = await axios.put(`${baseUrl}/user/items/auto/${itemId}`,
        {
            'setStatus': setStatus === true ? 'ACT' : 'DEACT'
        }, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}

export const getNotifyLimit = async (credentials) => {

    const { userId, role } = credentials
    const result = await axios.get(`${baseUrl}/user/bots`, {
        headers: header(userId, role)
    }
    ).then()
    return result;
}
