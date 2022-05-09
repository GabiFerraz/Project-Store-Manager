const handleError = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
    // se no parâmetro do next eu passar um status com o número, vai cair nesse erro desse if.
  }
  return res.status(500).json({ message: err.message });
  // se eu não passar no next um parâmetro status com o número do erro, vai cair nesse erro 500.
};

module.exports = handleError;