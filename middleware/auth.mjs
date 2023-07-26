import jwt from "jsonwebtoken";
import withError from "../utils/response/withError.mjs";

export default class AuthMiddleware{
    loggedIn(req, res, next){
        const header = req.headers.authorization;

        try {
            if (!header) {
                withError(res,403,'Anda tidak berhak!')
                return;
            }
            const token = header.split(' ')[1];
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) return withError(res,403,err.message)
                next();
            });
        } catch (error) {
            withError(res,401,error.message)
        }
    }
}