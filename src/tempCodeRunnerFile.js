app.get("/api/customers/:id/", async (req, res) => {
  console.log({
    requestParams: req.params,
    requestQuery: req.query,
  });
  const customerId = req.params.id;
  console.log(customerId);
});