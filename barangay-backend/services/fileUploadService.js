const fs = require("fs");
const path = require("path");

module.exports = {
  saveFile: (file, folder = "uploads") => {
    const dir = path.join(__dirname, "..", folder);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const filePath = path.join(dir, file.name);

    file.mv(filePath);

    return filePath;
  },
};