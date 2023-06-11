exports.get404 = (req, res, next) => {
    res.status(404).send('what the duce man!')
  };