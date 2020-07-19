const db = require("../models");
const e = require("express");

module.exports = (app) => {

    // ************************************************************************************************************** //
    // ********************************************* GET Route Requests ********************************************* //
    // ************************************************************************************************************** //


    // *************************************** BASIC USER GET Route Requests  *************************************** //

    // Will send all instruments available 
    app.get("/api/instruments", (req, res) => {

        db.cb_Instrument.findAll().then(allInstruments => { // Will send all instruments from instrument table
            console.log("instruments sent!");
            res.json(allInstruments);
        });
    });


    app.get("/api/instruments/:instr", (req, res) => {
        // let query = req.params.instr.toLowerCase();

        // let instrIndex = instr.findIndex(i => {
        //     return query
        // });
        // instrIndex = query;
        // instrIndex++;

        db.cb_Post.findAll({

            include: [db.cb_User],
            where: {
                fk_instrument: instrIndex
            },
            raw: true
        })
            .then(usersPosts => {
                console.log("REQUESTED QUERIED instrument POSTS ---> ", usersPosts);
                res.json(usersPosts);
            });
    });



    // Will send all criteria options available
    app.get("/api/criteria", (req, res) => {

        db.cb_Criteria.findAll().then(allCriteria => {  // Will send all criteria options from criteria table
            console.log("Criteria options sent!");
            res.json(allCriteria);
        });
    });

    app.get("/api/criteria/sell", (req, res) => {
        db.cb_Post.findAll({
            include: [db.cb_User],
            where: {
                fk_criteria: 2
            },
            raw: true
        })
            .then(usersPosts => {
                console.log("ALL POSTS ---> ", usersPosts);
                res.json(usersPosts);
            });
    });

    app.get("/api/criteria/buy", (req, res) => {
        db.cb_Post.findAll({
            include: [db.cb_User],
            where: {
                fk_criteria: 1
            },
            raw: true
        })
            .then(usersPosts => {
                console.log("ALL POSTS ---> ", usersPosts);
                res.json(usersPosts);
            });
    });

    // Will send all Users to the frontend
    app.get("/api/users", (req, res) => {

        db.cb_User.findAll().then(allUsers => { // Will send ALL Users  
            console.log("Posts sent!");
            res.json(allUsers);
        });
    });

    // Will send all Posts to the frontend
    app.get("/api/posts", (req, res) => {

        db.cb_Post.findAll().then(allPosts => { // Will send ALL Posts  
            console.log("Posts sent!");
            res.json(allPosts);
        });
    });

    // ********************************* COMPLEX USER GET Route Requests (user & post data) ********************************* //

    // Will send all user Posts AND their users data to the frontend 
    app.get("/api/all", (req, res) => {

        db.cb_User.findAll({
            include: [db.cb_Post],
            raw: true
        })
            .then(usersPosts => {
                console.log("ALL POSTS ---> ", usersPosts);
                res.json(usersPosts);
            });
    });

    // Will send all queried (by user name) user Posts and their users data to the frontend 
    app.get("/api/all/username/:userName", (req, res) => {
        const query = req.params.userName;

        db.cb_User.findAll({

            include: [db.cb_Post],
            where: {
                userName: query
            },
            raw: true
        })
            .then(queryPosts => {
                console.log("REQUESTED QUERIED POSTS ---> ", queryPosts);
                res.json(queryPosts);
            });
    });

    // Will send all queried (by user email) user Posts and their users data to the frontend 
    app.get("/api/all/userEmail/:userEmail", (req, res) => {
        const query = req.params.userEmail;

        db.cb_User.findAll({

            include: [db.cb_Post],
            where: {
                userEmail: query
            },
            raw: true
        })
            .then(queryPosts => {
                console.log("REQUESTED QUERIED POSTS ---> ", queryPosts);
                res.json(queryPosts);
            });
    });

    // Will send all queried (by user number) user Posts and their users data to the frontend 
    app.get("/api/all/userNumber/:userNumber", (req, res) => {
        const query = req.params.userNumber;

        db.cb_User.findAll({

            include: [db.cb_Post],
            where: {
                userNumber: query
            },
            raw: true
        })
            .then(queryPosts => {
                console.log("REQUESTED QUERIED POSTS ---> ", queryPosts);
                res.json(queryPosts);
            });
    });

    // Will send all Posts and their users data by descending date order (DESC --> Latest post to oldest POST) to the frontend 
    app.get("/api/posts/dateDesc/:username", (req, res) => {
        const query = req.params.username;

        db.cb_User.findAll(
            {
                include: [db.cb_Post],
                where: {
                    userName: query
                },
                // limit: 10,
                order: [['createdAt', 'DESC']],
                raw: true
            }

        ).then(allPosts => { // Will send ALL Posts  
            console.log("Posts sent by DESC order!");
            res.json(allPosts);
        });
    });

    app.get("/api/posts/all/dateDesc", (req, res) => {
        // const query = req.params.username;

        db.cb_User.findAll(
            {
                include: [db.cb_Post],
                // limit: 10,
                order: [['createdAt', 'DESC']],
                raw: true
            }

        ).then(allPosts => { // Will send ALL Posts  
            console.log("Posts sent by DESC order!");
            res.json(allPosts);
        });
    });


    app.get("/api/posts/all/dateAsc", (req, res) => {
        // const query = req.params.username;

        db.cb_User.findAll(
            {
                include: [db.cb_Post],
                // limit: 10,
                order: [['createdAt', 'ASC']],
                raw: true
            }

        ).then(allPosts => { // Will send ALL Posts  
            console.log("Posts sent by ASC order!");
            res.json(allPosts);
        });
    });



    // Will send all Posts and their users data by ascending date order (ASN --> Latest post to oldest POST) to the frontend 
    app.get("/api/posts/dateAsc/:username", (req, res) => {
        const query = req.params.username;

        db.cb_User.findAll(
            {
                include: [db.cb_Post],
                where: {
                    userName: query
                },
                // limit: 10,
                // order: [['createdAt', 'DESC']],
                order: [['createdAt', 'ASC']],
                raw: true
            }

        ).then(allPosts => { // Will send ALL Posts  
            console.log("Posts sent by ASC order!");
            res.json(allPosts);
        });
    });

    // Will send all user email Posts and their users data by ascending date order (ASC --> Latest post to oldest POST) to the frontend 
    app.get("/api/posts/dateAsc/:useremail", (req, res) => {
        const query = req.params.useremail;

        db.cb_User.findAll(
            {
                include: [db.cb_Post],
                where: {
                    userEmail: query
                },
                // limit: 10,
                order: [['createdAt', 'ASC']],
                raw: true
            }

        ).then(allPosts => { // Will send ALL Posts  
            console.log("Posts sent by ASC order!");
            res.json(allPosts);
        });
    });

    // Will send all user email Posts and their users data by ascending date order (DESC --> Latest post to oldest POST) to the frontend 
    app.get("/api/posts/dateAsc/:useremail", (req, res) => {
        const query = req.params.useremail;

        db.cb_User.findAll(
            {
                include: [db.cb_Post],
                where: {
                    userEmail: query
                },
                // limit: 10,
                order: [['createdAt', 'DESC']],
                raw: true
            }

        ).then(allPosts => { // Will send ALL Posts  
            res.json(allPosts);
        });
    });


    const instr = [
        // 1        2        3          4          5           6            7               8             9  
        "guitar", "bass", "drums", "percussion", "brass", "woodwind", "synthesizer", "studio", "dj"];


    // Will send all queried (by instrument) user Posts and their users data to the frontend 

    app.get("/api/posts/instrument/:instr", (req, res) => {
        const query = req.params.instr.toLowerCase();

        let instrIndex = instr.findIndex(i => {
            return query === i
        });

        instrIndex++;

        db.cb_Post.findAll(
            {
                include: [db.cb_User],
                where: {
                    fk_instrument: instrIndex
                },
                // limit: 10,
                // order: [['createdAt', 'DESC']],
                raw: true
            }

        ).then(allPosts => { // Will send ALL Posts  
            res.json(allPosts);
        });
    });

    const criteria = ["buying", "selling"];

    // Will send all queried (by criteria) user Posts and their users data to the frontend 

    app.get("/api/posts/criteria/:cri", (req, res) => {
        const query = req.params.cri.toLowerCase();

        let criIndex = criteria.findIndex(c => {
            return query === c
        });

        criIndex++;

        db.cb_Post.findAll(
            {
                include: [db.cb_User],
                where: {
                    fk_criteria: criIndex
                },
                // limit: 10,
                // order: [['createdAt', 'DESC']],
                raw: true
            }

        ).then(allPosts => { // Will send ALL Posts  
            console.log("Posts sent by DESC order!");
            res.json(allPosts);
        });
    });


    // app.get("/api/posts/all/sell/:instr", (req, res) => {
    //     const query = req.params.instr.toLowerCase();
    //     let instrIndex = instr.findIndex(i =>{
    //         return query === i
    //     });
    //     instrIndex++;
    //     db.cb_Post.findAll(
    //         {
    //             include: [db.cb_User],
    //             where: {
    //                 fk_criteria: 1,
    //                 fk_instrument:instrIndex 
    //             },
    //             // limit: 10,
    //             // order: [['createdAt', 'DESC']],
    //             raw: true
    //         }

    //     ).then(allPosts => { // Will send ALL Posts  
    //         console.log("instrument selling Posts sent!");
    //         console.log(JSON.stringify(allPosts));
    //         res.json(allPosts);
    //     });
    // });



    // app.get("/api/posts/all/buy/:instr", (req, res) => {
    //     const query = req.params.instr.toLowerCase();
    //     let instrIndex = instr.findIndex(i =>{
    //         return query === i
    //     });

    //     instrIndex++;

    //     db.cb_Post.findAll(
    //         {
    //             include: [db.cb_User],
    //             where: {
    //                 fk_criteria: 2,
    //                 fk_instrument:instrIndex 
    //             },
    //             // limit: 10,
    //             // order: [['createdAt', 'DESC']],
    //             raw: true
    //         }

    //     ).then(allPosts => { // Will send ALL Posts  
    //         console.log("instrument selling Posts sent!");
    //         console.log(JSON.stringify(allPosts));
    //         res.json(allPosts);
    //     });
    // });
};







