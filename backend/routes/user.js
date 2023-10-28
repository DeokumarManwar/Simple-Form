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

    // Apply SHA-1 hash to the password
    const sha1Password = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    // Apply Caesar Cipher to the SHA-1 hash (e.g., shift by 3 positions)
    const encryptedPassword = caesarCipher(sha1Password, 3);

    const newUser = await user.create({
      userName: userName,
      email: email,
      password: encryptedPassword,
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

  if (!foundUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Decrypt the stored password using Caesar Cipher (e.g., shift by 3 positions)
  const decryptedPassword = caesarCipher(foundUser.password, -3);

  // Apply SHA-1 hash to the provided password and compare with the stored password
  const sha1Password = crypto.createHash("sha1").update(password).digest("hex");

  if (decryptedPassword === sha1Password) {
    res
      .status(200)
      .json({ message: "Authentication successful", user: foundUser });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

module.exports = router;
