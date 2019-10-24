module.exports = {
    config: function(req, res, next){
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        res.setHeader('Content-Type', 'application/json');

        if ('OPTIONS' === req.method) {
            res.send();
            return;
        }

        next();
    }
}