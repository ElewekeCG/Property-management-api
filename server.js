const app = require("./app");
const connectDB = require("./config/db.config");
const port = process.env.PORT || 8000;

// Connect to the database and start the server (We use this method to ensure the db is connected)
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Database connection failed!`, err.message);
    process.exit(1);
  });
