require('dotenv').config();

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const HASHNUM = process.env.HASHNUM;
const MONGO_URI = process.env.MONGO_URI;


module.exports = {
    PORT,
    SECRET,
    HASHNUM,
    MONGO_URI
}
