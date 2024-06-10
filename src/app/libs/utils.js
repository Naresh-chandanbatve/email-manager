const createConfig = (url, accessToken) => {
    return {
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }
} 

module.exports = {createConfig}