

const express = require("express");
const app = express();
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const methodOverride = require("method-override");
const path = require("path");
const { connect } = require("http2");
const flash = require("connect-flash");
const session = require("express-session");

app.use(flash());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

// setup session middleware
app.use(
  session({
    secret: "vishu",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.success1 = req.flash("success1");
  res.locals.success2 = req.flash("success2");
  res.locals.err = req.flash("err");
  next();
});

//clever cloud connection
const connection = mysql.createConnection({
  host: "bxxvl2lgeldkytl7vedh-mysql.services.clever-cloud.com",
  user: "uxitxjnscy532hvh",
  password: "hTFbFWfbbqDx25XtYNps",
  database: "bxxvl2lgeldkytl7vedh",
  port: 3306, // Default MySQL port
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to Clever Cloud MySQL Database!");
});

//create connection to db
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "notes",
//   password: "Vishal@12345",
// });

//home route
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// create notes route
app.get("/notes/new", (req, res) => {
  res.render("allnotes.ejs");
});

// create route and store data in db using form submission
app.post("/notes", (req, res) => {
  let id = uuidv4();
  //  console.log(id);
  let { username: newUser, topic: newTopic, content: newContent } = req.body;
  //  console.log(newUser)
  let q = `INSERT INTO allnotes VALUES (?,?,?,?)`;
  let newNote = [id, newUser, newTopic, newContent];
  try {
    connection.query(q, newNote, (err, result) => {
      if (err) throw err;
      console.log(result[0]);
      req.flash("success", "New Note created successfully!");
      res.redirect("/notes");
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in db");
  }
});

//show all notes route
app.get("/notes", (req, res) => {
  let q = `SELECT * FROM allnotes`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let notesData = result;
      // console.log(notesData);
      res.render("allnotes.ejs", { notesData });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in db");
  }
});

//search route
app.post("/notes/search", (req, res) => {
  console.log(req.body); // Log the entire request body
  let { search: searchUser } = req.body;

  let q = `SELECT id,username,topic,content FROM allnotes WHERE username ='${searchUser}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let searchData = result;
      if (searchData.length !== 0) {
        res.render("search.ejs", { searchData });
      } else {
        req.flash("err", "Please Enter Valid Username");
        res.redirect("/notes");
      }
    });
  } catch (err) {
    console.log(err);

    res.send("Some error in db");
  }
});

//update route
//edit form
app.get("/notes/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM allnotes WHERE id= '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let notesData = result[0];
      res.render("update.ejs", { notesData });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in db");
  }
});

//edit form submit and update in db route
app.patch("/notes/:id", (req, res) => {
  let { id } = req.params;
  let { topic: newTopic, content: newContent } = req.body;
  let q = `UPDATE allnotes 
    SET topic='${newTopic}', content='${newContent}'
    WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      req.flash("success1", "Note Edited successfully!");
      res.redirect("/notes");
    });
  } catch (err) {
    consolelog(err);
    res.send("Some error in db");
  }
});

//edit at search page
app.get("/notes/search/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM allnotes WHERE id= '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let notesData = result[0];
      res.render("update.ejs", { notesData });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in db");
  }
});

//edit form at search page and submit and update in db route
app.patch("/notes/search/:id", (req, res) => {
  let { id } = req.params;
  let { topic: newTopic, content: newContent } = req.body;
  let q = `UPDATE allnotes 
    SET topic='${newTopic}', content='${newContent}'
    WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.redirect("/notes");
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in db");
  }
});

//delete route
app.delete("/notes/:id", (req, res) => {
  let { id } = req.params;
  // console.log( {id});
  let q = `DELETE FROM allnotes WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      req.flash("success2", "Note Deleted successfully!");
      res.redirect("/notes");
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in db");
  }
});

//delete from search page
app.delete("/notes/search/:id", (req, res) => {
  let { id } = req.params;

  // console.log( {id});
  let q = `DELETE FROM allnotes WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.redirect("/notes");
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in db");
  }
});

// to check db in connected properl
// try{
//     connection.query("select * from allnotes", (err, result) =>{
//         if(err) throw err;
//         console.log(result);
//     })
// }catch(err){
//     console.log(err);
// }
// connection.end();

let port = 9000;

app.listen(port, () => {
  console.log(`Server is available at ${port}`);
});
