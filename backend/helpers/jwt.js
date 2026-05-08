const { expressjwt: expressJwt } = require('express-jwt');
const config = require('../config.json');
module.exports = jwt;

function jwt() {
    //Secret for jwt , we can change this value, a random string can be used
    const { secret } = config;
    return expressJwt({
        getToken: function fromHeaderOrQuerystring(req) {
            // console.log('req: ', req.headers.authorization);
            // console.log(' req.headers: ',  req.headers);
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }, secret, algorithms: ['HS256']
    }).unless({
        path: [
            // public routes that don't require authentication
            '/Login',
            '/Public',
            /^\/Sales_Master\/Print_Quotation\/.*/
        ],
        custom: function (req) {
            return req.method === 'OPTIONS';
        }
    });
}