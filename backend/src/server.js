const app = require("./app");
const initDB = require("./config/initDB");

const PORT = process.env.PORT || 3000;

initDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
