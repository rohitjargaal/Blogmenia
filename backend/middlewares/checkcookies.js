import jwt from "jsonwebtoken";

export const isLogin = async (req, res, next) => {
    const checktoken = req.headers.authorization;
    if (!checktoken) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    else {
        try {
            const token = checktoken.split("Bearer ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.userId;
            req.token = token;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
    }
};
