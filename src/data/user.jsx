const users = [
    {
        user: 'user',
        pass: 'pass',
        role: 'admin',
        token: 'user',
    },
    {
        user: 'aki',
        pass: 'arch',
        role: 'user',
        token: 'user',
    },
    {
        user: 'u',
        pass: 'p',
        role: 'user',
        token: 'user',
    },
]


export function verifyUser(user, pass) {

    const userFound = users.find((u) => {
        return u.user === user && u.pass === pass;
    })

    return userFound ? { role: userFound.role, token: userFound.token } : null

}