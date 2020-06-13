module.exports = (req, res, next) => {
   const { usuario } = req.session;

   if (!usuario) {
      return res.redirect("/");
   }

   res.locals.usuario = usuario;
   return next();
}