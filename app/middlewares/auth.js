const checkLogin = ((req, res, next) => {
    if (!req.session.user_id) { //Make sure the session name "user_id" is matching the name in your login function
        console.log(req.session.user_name + ' Unauthorized');
        res.status(401).send('Please Login.');
    } else {
        console.log(req.session.user_name + " authorized.");
        next();
    }
})

export default checkLogin;
