const express = require('express');

// index.js
const logger = require("./utils/logger");

const app = express();

app.get("/", (req, res, next) => {
    logger.info("Home called");

    res.status(200).json({
        message: "Welcome"
    })

})


app.post("/user", (req, res, next) => {
    const {
        body
    } = req;

    logger.debug("Create user", {
        body
    })


    // just a demo.
    let user = {
        name: body.name,
        email: body.email,
    }

    user.save().then(user => {
            logger.debug("User Created", user)

            res.status(200).json({
                message: "user created",
                user
            })
        })
        .catch(error => {
            logger.error("Error on creating user", {
                error
            })

            res.status(500).json({
                message: "Error on creating User",
                user
            })
        })
})

app.get("/user", async (req, res, next) => {
    const {
        query
    } = req;

    logger.debug("Get Users", {
        query
    })

    let users = [];
    try {
        users = await User.find() // some db call
    } catch (error) {
        logger.error("Error on get users", {
            error
        })
    }

    res.status(200).json({
        users
    })
})

app.get("/user/:userId", async (req, res, next) => {
    const {
        params,
    } = req;

    logger.debug("Get User", {
        params,
    })

    let user;

    try {
        user = await User.findById(params.userId)
    } catch (error) {
        console.log(error);
        logger.error("Error on getting user", error)
    }

    if (user) {
        res.status(200).json({
            message: "User info",
            user
        })
    } else {
        res.status(404).json({
            message: "User not found."
        })
    }

})


// to change log level
// useful while debuging on production
// make sure this endpoint cannot be called from outside
app.get('/nnn/logs', (req, res, next) => {
    const {
        query
    } = req;

    logger.info("Updating log", {
        query
    });

    logger.level = query.level;

    res.status(200).json({
        message: "Updated"
    })

})


app.listen(3000);
// logger.info("Server Started at " + 3000)


let obj = {
    asdf: "Asdf"
}

let obj2 = {
    asdfasdf: "SAdfasdf"
}

logger.info("Hello World", {
    obj,
    obj2
});
logger.warn("Warning message");
// logger.error("error message here")
// logger.debug("Debug me")


const indexLogger = logger.child({
    service: "Index"
})

indexLogger.info("Ha ha");

indexLogger.info("Ha ha", {
    "asdf": "Asdf"
});

logger.info("Hello World", {
    obj,
    obj2
});
logger.warn("Warning message");


const testFunc = () => {
    let test;
    try {
        test = Tester.rasdf();
    } catch (error) {
        logger.error("error on testFunc", error, {
            asdf: "Asdf"
        })

    }
}
testFunc();