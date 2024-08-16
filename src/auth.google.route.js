const { Router } = require('express');
const passport = require('passport');

const googleAuthRouter = Router();

googleAuthRouter.get("/", passport.authenticate("google", { scope: ["email", "profile"] }));

googleAuthRouter.get("/auth/google/callback", (req, res) => {
    console.log(req);
}, passport.authenticate("google", { failureRedirect: "/login", successRedirect: '/f' }));

module.exports = googleAuthRouter;