    exports = Sequelize = require('sequelize')
    let options = {
        host: '',
        dialect: "postgres",
        port:5432,
        logging: false,
        define: {
            underscored: false,
            schema: "public"
        },
        pool: {
            max: 100,
            min: 0,
            idle: 20000,
            acquire: 1000000
        },
    };
    Object.assign(options, { host: "127.0.0.1" })
    sequelize = new Sequelize("Coordinator","postgres", "password", options);
    sequelize.authenticate()
        .then(() => {
            console.log(`Database connected.`);
        })
        .catch(err => {
            console.log(`External:Error in connecting database : `, err);
            process.exit(0);
        });
    let syncConfig = { alter: { alter: true, drop: false }, force: false };
    sequelize.sync(syncConfig).then(() => {
        console.log("Successfully created table")
    }).catch((err) => {
        console.log("err", err)
    })
exports = sequelize;
 