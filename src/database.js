const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "Praveen@123",
        database: "praveen"
    }
})

knex.schema.createTable("user3",table=>{
    table.increments("id");
    table.string("username");
    table.string("email");
    table.string("password");
    table.integer("phone");
}).then((data)=>{
    console.log("data_created");
}).catch((err)=>{
    // console.log(err);
})

module.exports = knex
