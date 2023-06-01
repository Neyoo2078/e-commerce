import jwt from 'jsonwebtoken';
export const UserAuth = async (req, res, next) => {
  try {
    console.log('here');
    const auth = req.headers.authorization?.split(' ')[1];

    const decodedData = jwt.verify(auth, process.env.JWT_PASSWORD);
    req.user = decodedData;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
