const express = require("express");
const user = require("../models/user");
const crypto = require("crypto");
const router = express.Router();

// Function to apply Caesar Cipher
function caesarCipher(text, shift) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char.match(/[a-z]/i)) {
      let code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }
    result += char;
  }
  return result;
}

router.post("/register", async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    console.log(userName, password, email);
    // Apply Caesar Cipher to the password and then SHA-1 hash it
    const encryptedPassword = caesarCipher(password, 3); // Apply Caesar Cipher
    const sha1Password = crypto
      .createHash("sha1")
      .update(encryptedPassword)
      .digest("hex"); // Apply SHA-1 hash to the Caesar Cipher result

    const newUser = await user.create({
      userName: userName,
      email: email,
      password: sha1Password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const foundUser = await user.findOne({ userName: userName });

  console.log(foundUser);

  if (!foundUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Apply Caesar Cipher to the password and then SHA-1 hash it
  const encryptedPassword = caesarCipher(password, 3); // Apply Caesar Cipher
  const sha1Password = crypto
    .createHash("sha1")
    .update(encryptedPassword)
    .digest("hex"); // Apply SHA-1 hash to the Caesar Cipher result

  console.log(foundUser.password, sha1Password);

  if (foundUser.password === sha1Password) {
    res
      .status(200)
      .json({ message: "Authentication successful", user: foundUser });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

module.exports = router;
