import axios from './customizeAxios'

export const handleRegister = async (name, email, password, phoneNumber) => {
    return await axios.post('auth/register', { name, email, password, phoneNumber })
}

export const handleLogin = async (username, password) => {
    return await axios.post('auth/login', { username, password })
}

export const handleLoginGoogle = async (email, name, avatar) => {
    return await axios.post('auth/google', { email, name, avatar })
}

export const handleLogoutAccount = async () => {
    return await axios.post('auth/logout')
}

export const fetchAccount = async () => {
    return await axios.get('auth/profile')

}

export const fetchChangePassword = async (currentPassword, newPassword) => {
    return await axios.post('auth/change-password', { currentPassword, newPassword })

}

export const fetchAccountByID = async (id) => {
    return await axios.get(`users/${id}`)

}

export const fetchAllUser = async () => {
    return await axios.get(`users`)

}


export const fetchSortAllUserPaginate = async (current, pageSize, sort, filter) => {
    return await axios.get(`users?current=${current}&pageSize=${pageSize}&sort=${sort}`)

}

export const fetchFindAllByEmail = async (current, pageSize, email) => {
    return await axios.get(`users?current=${current}&pageSize=${pageSize}&email=${email}`)

}

export const handleCreateNewUser = async (name, phoneNumber, role, email, password) => {
    return await axios.post('users', { name, phoneNumber, role, email, password })
}


export const handleUpdateRoleUser = async (email, role) => {
    return await axios.patch(`users/${email}`, { role })
}

export const handleUpdateInfoUser = async (email, phoneNumber) => {
    return await axios.patch(`users/${email}`, { phoneNumber }, { timeout: 2000 })
}


export const handleDeleteUser = async (id) => {
    return await axios.delete(`users/${id}`)
}

//BOOKS

export const fetchAllBook = async () => {
    return await axios.get(`products`)

}

export const fetchBookById = async (id) => {
    return await axios.get(`products/${id}`)

}

export const fetchGetCategory = async () => {
    return await axios.get(`products/category`)

}

export const handleUploadFile = async (file) => {
    const bodyFormData = new FormData()
    bodyFormData.append('image', file)
    return await axios({
        method: 'post',
        url: 'file/upload',
        data: bodyFormData,
        headers: { "content-type": "multipart/form-data" }
    })

}

export const handleCreateNewBook = async (author, mainText, price, quantity, sold, category, thumbnail, slider) => {
    return await axios.post('products', { author, mainText, price, quantity, sold, category, thumbnail, slider })
}

export const handleUpdateBook = async (id, author, mainText, price, quantity, sold, category, thumbnail, slider) => {
    return await axios.patch(`products/${id}`, { author, mainText, price, quantity, sold, category, thumbnail, slider })
}

export const handleDeleteBook = async (id) => {
    return await axios.delete(`products/${id}`)
}

export const fetchSortAllBookPaginate = async (current, pageSize, sort, filter) => {
    if (sort == 'all') {
        return await axios.get(`products?current=${current}&pageSize=${pageSize}`)

    } else {
        return await axios.get(`products?current=${current}&pageSize=${pageSize}&sort=${sort}`)

    }

}

//ORDERS

export const handleUpdateOrder = async (id, name, address, phoneNumber, totalPrice, status) => {
    return await axios.patch(`orders/${id}`, { name, address, phoneNumber, totalPrice, status }, { timeout: 5000 })
}


export const fetchAllOrders = async (status) => {
    if (!status) {
        return await axios.get(`orders`)
    } else if (status == 'all') {
        return await axios.get(`orders`)
    } else {
        return await axios.get(`orders?status=${status}`)
    }

}

export const fetchAllLengthOrders = async () => {
    return await axios.get(`orders/length`)

}

export const fetchSortTabsAllOrders = async (sort) => {
    return await axios.get(`orders?sort=${sort}`)

}

export const fetchAllOrdersPaginate = async (sort, status) => {
    return await axios.get(`orders?sort=${sort}&status=${status}`)

}


//COMMENT
export const handleCreateComment = async (rate, description, image, productID) => {
    return await axios.post('comments', { rate, description, image, productID })
}

export const fetchAllComment = async () => {

    return await axios.get(`comments`)


}

//ORDER
export const handleCreateOrder = async (name, email, address, phoneNumber, totalPrice, item) => {
    return await axios.post('orders', { name, email, address, phoneNumber, totalPrice, item }, { timeout: 4000 })
}