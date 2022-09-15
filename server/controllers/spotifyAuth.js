const querystring = require('querystring');
const User = require('../models/userModel');
const hookAsync = require('../utils/hookAsync');
const jwt = require('jsonwebtoken');
const axios = require('axios').default;
//oauth through spotify api

const signToken = id => {
    return jwt.sign({ id }, 'mPkd23I1sE3wkXn-imusic-secure', {
        expiresIn: '90d'
    });
}

const createSendToken = (user, req, res, ) => {
    const token = signToken(user._id);
    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https' || true
    });
    user.password = undefined //remove password from response output
}


exports.login = async(req, res) => {
    const scope =
        `streaming 
user-read-email 
user-read-private 
user-library-read 
user-library-modify 
user-read-playback-state 
user-modify-playback-state
    `;

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECTURI
        })
    );
}

let isloggedDone = false;
let query;
//gets log user credentials
exports.logged = async(req, res, next) => {

    // await fetch('https://accounts.spotify.com/api/token', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //             "Accept": "application/json"
    //         },
    //         body: encodeFormData(body)
    //     })
    //     .then(response => response.json())

    // .then(data => {
    //     query = querystring.stringify(data);


    // }).catch(err => res.redirect(`${process.env.CLIENT_REDIRECTURI}`))

    next()

};

exports.getUser = hookAsync(async (req, res) => {
    const body = req.body;
    // extract name,email,photo
    if (!body.email) {
        res.status(404).json('Something went wrong');
    }

    const findUser = await User.find({ email: body.email });


    if (findUser.length === 0) {
        const newUser = await User.create({
            name: body.display_name,
            email: body.email,
            password: body.id,
            passwordConfirm: body.id,
            photo: body.url
        });

        createSendToken(newUser, req, res);
        res.status(200).json(body);

    } else {
        const user = await User.findOne({ email: body.email }).select('+password');
        if (!user || !(await user.correctPassword(body.id, user.password))) {
            return res.status(401).json({
                "statusCode": 403,
                "status": "fail",
                "isOperational": true,
                "message": 'Incorrect email or password'
            });
        }
        createSendToken(user, req, res);
        res.status(200).json(user);
    }
});


exports.refreshToken = async(req, res) => {

        // requesting access token from refresh token
        const scope =
            `streaming 
user-read-email 
user-read-private 
user-library-read 
user-library-modify 
user-read-playback-state 
user-modify-playback-state
    `;
        let refresh_token = 'AQDkyEOVZ4QUy_9nCdJu23eJ84-usOM5dkOlYZ9Cdm6eDnBF65nTrxahu_HVT6C7XwzJ38Bp9XkkgWbLddp-012hDLd-8S8Ap-PUSDi9vNnyOo3ALfWY3GswWFjNjVm2tWE'
            // req.cookies.refresh_token;

        axios({
                    method: "post",
                    url: "https://accounts.spotify.com/api/token",
                    data: querystring.stringify({
                        grant_type: "refresh_token",
                        scope: scope,
                        refresh_token: refresh_token,
                    }),
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        Authorization: `Basic ${new Buffer.from(
                `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
            ).toString("base64")}`,
        },
    })
        .then((response) => {

            res.cookie('access_token', response.data.access_token);
            res.redirect(`${process.env.CLIENT_REDIRECTURI}?access_token=${response.data.access_token}`);
        })
        .catch((error) => {
            res.redirect(`${process.env.CLIENT_REDIRECTURI}`);
        });

};