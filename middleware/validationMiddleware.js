const validate = (req, res, next) => {
  const { email, password, role, fullname, companyName } = req.body;

  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{10,}$/;
  if (!strongPassword.test(password)) {
    return res.status(400).json({ error: "Passwort zu schwach" });
  }

  if (
    role === "applicant" &&
    (!fullname || fullname.length < 3 || fullname.length > 20)
  ) {
    return res.status(400).json({ error: "Ungültiger Name" });
  }
  if (
    role === "company" &&
    (!companyName || companyName.length < 3 || companyName.length > 20)
  ) {
    return res.status(400).json({ error: "Ungültiger Firmenname" });
  }

  next();
};

export default validate;
