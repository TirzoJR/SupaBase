import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';


const generarToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
};


const verificarToken = (token) => {
    return jwt.verify(token, SECRET);
};

export { generarToken, verificarToken };
