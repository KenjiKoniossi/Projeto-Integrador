module.exports = (req, res, next) => {
   const { usuario } = req.session;

   if (!usuario) {
      return res.render('paginaInicial', { msg: "Você deve estar logado para acessar esta página." });
   }

   res.locals.usuario = usuario;
   return next();
}