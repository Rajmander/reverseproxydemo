import { signupService, getUsersService } from "./auth.service.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password, age, city, salary } = req.body;
    const userData = {
      name: username,
      email: email,
      password: password,
      city: city,
      age: age,
      salary: salary,
    };
    await signupService(userData);
  } catch (error) {
    return error;
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await getUsersService();
    res.json({ message: "Users listing", data: users });
  } catch (error) {
    return error;
  }
};
