export default () => ({
    db_connection: process.env.DB_CONNECTION,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_synchronize: process.env.DB_SYNCHRONIZE,
    db_debug: process.env.DB_DEBUG
});