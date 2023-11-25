import express from "express";
import passport from "passport";
import session  from "express-session";
import './auth.js';


function isLog(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use("public",express.static('public'));
app.use(session({secret:'cats'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile('D:/FullStackCourse/GoogleOAuth/src/home.html');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] })
);
 
app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'auth/failure'
    })
);

app.get('/protected',isLog, (req,res)=>{
    res.sendFile("D:/FullStackCourse/GoogleOAuth/src/protected.html");
});

app.get('/auth/failure',(req,res)=>{
    res.send("Inoru vatti try pannu...");
});

app.get('/logout', (req, res) => {
    res.sendFile("D:/FullStackCourse/GoogleOAuth/src/logout.html");
    req.logout((err) => {
        if (err) {
            console.error('Error during logout:', err);
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.redirect('/login');
        });
    });
});

app.listen(3000.,()=>{
    console.log("http://localhost:3000");
})