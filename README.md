# 🔐 Authentication-Training

There will be commits for 6 levels of authentication in this repository.

**Level 1** - In this level, only username and password match is checked. There is no encrypting or such algorithm behind the code.

---

**Level 2** - Passwords of the users are encrypted via mongoose-encryption. Passwords cannot be seen on the database. 2a --> .env file is created. (master branch)
* **mongoose-encryption package** is installed to complete the first part.
* **dotenv package** is installed to achieve .env encryption.

---

**Level 3** - Hashing
* **md5 package** is installed for better encryption. (hash encryption)

---

**Level 4** - Salting and Hashing the Passwords
* **brcypt package** is installed for better protection. 
* 10 salt rounds are used for this example.

---

**Level 5** - Sessions + Cookies
* **passport, passport-local, passport-local-mongoose, express-session packages** are installed for this part.
* Worked on cookies, sessions & logout with passport.

---
