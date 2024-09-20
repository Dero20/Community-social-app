import jwt from "jsonwebtoken";

const generateToken = (userInfo) => {
  const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION || "30d";

  const accessToken = jwt.sign(
    {
      user: {
        userEmail: userInfo.email,
        userID: userInfo._id,
      },
    },
    process.env.SECRET_KEY,
    {
      expiresIn: accessTokenExpiration,
    }
  );
  return accessToken;
};

export { generateToken };
