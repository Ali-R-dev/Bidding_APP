import axios from "axios"

const baseUrl = "http://localhost:3001/api"

export const GetItems = async ({ id, role }, { page, search }) => {

    let queryStack = []

    if (page !== undefined) { queryStack.push(`page=${page}`) }

    if (search !== undefined && search !== '') { queryStack.push(`search=${search}`) }

    let query = queryStack.length > 0 ?
        queryStack.length > 1 ? "?" + queryStack.join('&') : "?" + queryStack[0]
        : '';


    const result = await axios.get(`${baseUrl}/adm/items/${query}`, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    )
        .then(res => res.data);
    return result;
}

export const GetItemById = async (itemId, credentials) => {
    const { id, role } = credentials

    const result = await axios.get(`${baseUrl}/adm/items/${itemId}`, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    )
        .then(res => res.data);
    return result;
}
export const CreateItem = async (item, credentials) => {
    const { id, role } = credentials
    const result = await axios.post(`${baseUrl}/adm/items`, item, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    )
        .then(res => res.data);
    return result;
}

export const UpdateItem = async (itemId, item, credentials) => {
    const { id, role } = credentials
    const result = await axios.put(`${baseUrl}/adm/items/${itemId}`, item, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    )
        .then(res => res.data);
    return result;
}

export const DeleteItem = async (itemId, credentials) => {
    const { id, role } = credentials
    const result = await axios.delete(`${baseUrl}/adm/items/${itemId}`, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    )
        .then(res => res.data);
    return result;
}

export const BidOnItem = async (itemId, bidAmount, credentials) => {

    const { id, role } = credentials
    console.log(bidAmount);
    const result = await axios.put(`${baseUrl}/user/items/bidnow/${itemId}`, { 'bidAmount': bidAmount, sample: 'sample' }, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    )
        .then(res => res.data);
    return result;
}

export const updateBot = async (botObj, credentials) => {

    const { id, role } = credentials
    const result = await axios.put(`${baseUrl}/user/bots`, botObj,
        {
            headers: {
                'Auth-id': id,
                'Auth-role': role,
                'Content-Type': 'application/json'
            }
        }
    )
        .then(res => res.data);
    return result;
}
export const getBotByUserId = async (credentials) => {

    const { id, role } = credentials
    const result = await axios.get(`${baseUrl}/user/bots`, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    )
        .then(res => res.data);
    return result;
}
export const AutoBidToogle = async (itemId, setStatus, credentials) => {

    const { id, role } = credentials
    const result = await axios.put(`${baseUrl}/user/items/auto/${itemId}`,
        {
            'setStatus': setStatus === true ? 'ACT' : 'DEACT'
        }, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    )
        .then(res => res.data);
    return result;
}

export const getNotifyLimit = async (credentials) => {

    const { id, role } = credentials
    const result = await axios.get(`${baseUrl}/user/bots`, {
        headers: {
            'Auth-id': id,
            'Auth-role': role,
            'Content-Type': 'application/json'
        }
    }
    ).then()
    return result;
}
