var express = require("express");
var app = express();
var session = require('express-session');
var flash = require("connect-flash");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());

app.use(require("express-session")({
    secret: "Shivam",
    resave: false,
    saveUninitialized: false
}));

app.use(session()); 

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.get("/", function(req, res){
    res.render("index");
});
app.get("/project1", function(req, res){
    res.render("portfolio-1");
});
app.get("/project2", function(req, res){
    res.render("portfolio-2");
});
app.get("/project3", function(req, res){
    res.render("portfolio-3");
});

app.post("/contact", async (req, res) => {
    const msg = {
      to: 'shivamdamre913@gmail.com',
      from: 'shivamdamre913@gmail.com',
      subject: "From ICA- "+ "regarding- "+ req.body.subject + "- Sender name- " +req.body.name + "- email- " + req.body.email + "-",
      text: req.body.message,
      html: req.body.message
    };
    try {
        await sgMail.send(msg);
        req.flash("success", "Thank you for contacting me, I Will come to you soon!");
        res.redirect("back");
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
        req.flash("error", "Sorry something went Wrong!");
        res.redirect("back");
      }
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("All set!");
});