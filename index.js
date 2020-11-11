const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const members = require("./Members");

const logger = require("./middleware/logger");

const members = require("./Members");

const app = express();

// initialize middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Render handlebars
app.get("/", (req, res) =>
  res.render("index", {
    title: "Members Application",
    members,
  })
);

// Render Handlebars
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Members App',
        members,
    })
})

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`App is running at http://localhost:${PORT}`)
);
