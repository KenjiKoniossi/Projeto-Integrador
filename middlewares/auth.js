module.exports = (req, res, next) => {
   const { usuario } = req.session;

   if (!usuario) {
      return res.redirect("/paginaInicial");
   }

   res.locals.usuario = usuario;
   return next();
}