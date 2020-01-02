const jwt = require('jsonwebtoken');
module.exports =  (req, res, next) => {
    const authHeader = req.get('Authorization');
    // console.log(authHeader)
    if (!authHeader) {
       req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; //output of this line: Bearer token... [1] is the token
    // console.log(token)
    if (!token || token === '') {
       req.isAuth = false;
        return next();
    }
    // var decodedTokent = jwt.verify(token, 'somesupersecretkey');
    // console.log(decodedTokent)
    var decoded = jwt.decode(token,'somesupersecretkey');
    // console.log(decoded)
    // let decodedToken;
    // try {
    // //  console.log('check')
    // decodedToken = await jwt.verify(token, 'somesupersecretkey',function(err,decoded){
    //     console.log(decoded)
    // }); 
    // console.log(decodedToken)
    // //  console.log('checkec')   
    // } catch (err) {
    //     req.isAuth = false;
    //     return next();
    // }
    console.log(decoded)
    if (!decoded) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decoded.userId;
    console.log(req.isAuth)
    
    next();
    

};
