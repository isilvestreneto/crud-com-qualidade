const fs = require("fs");
const DB_FILE_PATH = "./core/db.sql";
console.log("[CRUD]");

function create(content) {
    fs.writeFileSync(DB_FILE_PATH, content);
    return content;
}

// [SIMULATION]
console.log(create("Hoje eu preciso gravar aulas!"));