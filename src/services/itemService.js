import axios from "axios"

const baseUrl = "http://localhost:3001/api/items"

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


    const result = await axios.get(`${baseUrl}${query}`, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}

export const GetItemById = async (itemId, credentials) => {
    const { userId, role } = credentials

    const result = await axios.get(`${baseUrl}/${itemId}`, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}
export const CreateItem = async (item, credentials) => {
    const { userId, role } = credentials
    const result = await axios.post(`${baseUrl}`, item, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}

export const UpdateItem = async (itemId, item, credentials) => {
    const { userId, role } = credentials
    const result = await axios.put(`${baseUrl}/${itemId}`, item, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}

export const DeleteItem = async (itemId, credentials) => {

    const { userId, role } = credentials
    const result = await axios.delete(`${baseUrl}/${itemId}`, {
        headers: header(userId, role)
    });
    return result;
}

//---- bidding area ---- 

export const BidOnItem = async (itemId, bidAmount, credentials) => {

    const { userId, role } = credentials
    const result = await axios.put(`${baseUrl}/bidnow/${itemId}`, { 'bidAmount': bidAmount }, {
        headers: header(userId, role)
    }
    ).then(res => res.data);
    return result;
}
export const getBidsByItemId = async (itemId, credentials) => {

    const { userId, role } = credentials
    const result = await axios.get(`${baseUrl}/bids/${itemId}`, {
        headers: header(userId, role)
    }
    ).then(res => res.data);
    return result;
}
// /bids/: id

export const getUserHistory = async (credentials) => {

    const { userId, role } = credentials
    const result = await axios.get(`${baseUrl}/userhistory`, {
        headers: header(userId, role)
    }
    ).then(res => res.data);
    return result;
}

export const getInvoice = async (ItemId, credentials) => {
    const { userId, role } = credentials
    const result = await axios.get(`${baseUrl}/invoice/${ItemId}`, {
        headers: header(userId, role)
    }
    ).then(res => res.data);
    return result;
}

// ==============================================================
export const updateBot = async (botObj, credentials) => {

    const { userId, role } = credentials
    const result = await axios.put(`${baseUrl}/bot`, botObj,
        {
            headers: header(userId, role)
        }
    )
        .then(res => res.data);
    return result;
}

export const getBotByUserId = async (credentials) => {

    const { userId, role } = credentials
    const result = await axios.get(`${baseUrl}/bot`, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}
export const AutoBidToogle = async (itemId, setStatus, credentials) => {

    const { userId, role } = credentials
    const result = await axios.put(`${baseUrl}/auto/${itemId}`,
        {
            'setStatus': setStatus === true ? 'ACT' : 'DEACT'
        }, {
        headers: header(userId, role)
    }
    )
        .then(res => res.data);
    return result;
}

// export const getNotifyLimit = async (credentials) => {

//     const { userId, role } = credentials
//     const result = await axios.get(`${baseUrl}/user/bots`, {
//         headers: header(userId, role)
//     }
//     ).then()
//     return result;
// }
