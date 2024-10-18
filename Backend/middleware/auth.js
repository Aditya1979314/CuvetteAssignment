import jwt from 'jsonwebtoken';

export function userauth(req,res,next){
    const authorization = req.headers.authorization;
    const arr = authorization.split(" ");
    const token = arr[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.userid){
            req.userid = decoded.userid;
            next();
        }else{
            return res.status(403).json({"msg":"token not verified"});
        }
    }catch(err){
        return res.status(503).json({"msg":"user auth error"})
    }
}