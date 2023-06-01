import UserModel from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

export const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exist = await UserModel.findOne({ username });
    if (exist) {
      res.json({ msg: 'User Already Exist' });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const data = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const userSignin = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const exist = await UserModel.findOne({ email });
    console.log(exist);
    if (exist) {
      const pwdVerify = await bcrypt.compare(password, exist.password);
      if (!pwdVerify) {
        res.status(400).json('InCorrect Password');
        return;
      } else {
        const token = Jwt.sign(
          { username: exist.username, email: exist.email, id: exist._id },
          process.env.JWT_PASSWORD,
          { expiresIn: '2h' }
        );
        res.status(200).json({
          username: exist.username,
          email: exist.email,
          id: exist._id,
          token,
        });
      }
    } else {
      res.status(400).json({ msg: 'No Account found' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const userUpdate = async (req, res) => {
  const { username, email, password } = req.body;

  const { id } = req.params;

  try {
    const existing = await UserModel.findById(id);
    if (existing) {
      const hashPassword = await bcrypt.hash(password, 12);
      const newprofile = await UserModel.findByIdAndUpdate(
        id,
        { username, email, password: hashPassword },
        { new: true }
      );
      console.log(newprofile);
      const token = Jwt.sign(
        {
          username: newprofile.username,
          email: newprofile.email,
          id: newprofile._id,
        },
        process.env.JWT_PASSWORD,
        { expiresIn: '6h' }
      );
      res.status(200).json({
        username: newprofile.username,
        email: newprofile.email,
        id: newprofile._id,
        token,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
