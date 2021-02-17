module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "secret",
    DB: "amocas_dashboard",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};