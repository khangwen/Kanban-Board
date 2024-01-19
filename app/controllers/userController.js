import User from '../models/user.js';

const login = ((req, res, next) => {
    let userName = req.body.user_name;
    let password_attempt = req.body.password;

    User.findOne({ user_name: userName })
        .then((user) => {
            if (user.password != password_attempt) {
                res.status(400).send("Wrong password");
            }

            req.session.regenerate(function (err) {
                if (err) next(err)

                // store user information in session, typically a user id
                req.session.user_id = user._id;
                req.session.cookie.originalMaxAge = 3600000; // 1 hr
                req.session.cookie.reSave = true;

                // save the session before redirection to ensure page load does not happen before session is saved
                req.session.save(function (err) {
                    if (err) return next(err)
                    res.status(200).send({ user });
                })
            })
        })
        .catch(() => {
            console.log("User with user_name:" + userName + " not found.");
            res.status(400).send("Login name was not recognized");
        });

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //// Professor old code, deprecated
    // User.findOne({ user_name: userName }, (err, user) => {
    //     if (err || !user) {
    //         console.log("User with user_name:" + userName + " not found.");
    //         res.status(400).send("Login name was not recognized");
    //     }
    //     if (user.password != password_attempt) {
    //         res.status(400).send("Wrong password");
    //     }

    //     req.session.regenerate(function (err) {
    //         if (err) next(err)

    //         // store user information in session, typically a user id
    //         req.session.user_id = user._id
    //         req.session.cookie.originalMaxAge = 3600000; // 1 hr
    //         req.session.cookie.reSave = true;
    //         // save the session before redirection to ensure page load does not happen before session is saved
    //         req.session.save(function (err) {
    //             if (err) return next(err)
    //             res.status(200).send(user);
    //         })
    //     })
    // });
    //////////////////////////////////////////////////////////////////////////////////////////////////
});

const logout = ((req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log("Error logging out: " + err);
            res.status(400).send("Error logging out");
        }
        res.status(200).send("Logged out");
    })
});

const store = ((req, res) => {
    let userName = req.body.user_name;
    let password = req.body.password;
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;

    User.findOne({ user_name: userName })
        .then((user) => {
            res.status(400).send(user.user_name + " already exists!");
        })
        .catch(() => {
            User.create({
                user_name: userName,
                password: password,
                first_name: firstName,
                last_name: lastName
            }).then(
                res.status(200).send("User created.")
            ).catch(err => {
                console.log("error creating user: " + err);
                res.status(400).send("unable to create user");
            });
        });
});

export { login, logout, store };