const fs = require("fs");
const path = require("path");

const readFolderForRoutes = (folderPath) => {
  let exportObj = [];
  const allFiles = fs.readdirSync(folderPath);
  allFiles.forEach((fileName) => {
    const fileStat = fs.lstatSync(path.join(folderPath, fileName));
    if (fileName !== "index.js" && fileStat.isFile()) {
      const routeObj = {
        path: fileName == "root.js" ? "/" : `/${fileName.replace(".js", "")}`,
        route: path.join(folderPath, fileName.replace(".js", "")),
      };

      exportObj.push(routeObj);
    }
  });

  return exportObj;
};

let exportRoutes = readFolderForRoutes(__dirname)
module.exports = exportRoutes;
