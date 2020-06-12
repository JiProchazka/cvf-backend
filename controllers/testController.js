exports.testApi = (req, res) => {
  res.json({ currentDateTime: new Date() });
};
