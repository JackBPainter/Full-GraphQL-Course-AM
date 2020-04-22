import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.PRISMA_JWTSECRET, { expiresIn: '7 days' }) 
}

export default generateToken