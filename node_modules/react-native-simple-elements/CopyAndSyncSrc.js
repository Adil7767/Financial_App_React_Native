const fs = require("fs-extra");
const copyDir = require("copy-dir");
const defaultOption = {
    utimes: true,
    mode: true,
    cover: true,
};

const copyDirSync = (srcFolders, rootSrc, rootDest, option = {}) => {
    srcFolders.forEach(folder => {
        copyDir.sync(`${rootSrc}/${folder}`, `${rootDest}/${folder}`, {
            ...defaultOption,
            ...option,
        });
    });
};

const snapCoreFolders = [""];

fs.ensureDirSync("./react-native-simple-elements");
copyDirSync(
    snapCoreFolders,
    ".",
    "./react-native-simple-elements",
    {
        filter: function(stat, filepath, filename) {
            // do not want copy .git directories
            if (stat === "directory" && filename === "node_modules") {
                return false;
            }

            if (stat === "directory" && filename === ".git") {
                return false;
            }

            if (filename === "yarn.lock") {
                return false;
            }

            if (stat === "directory" && filename === "examples") {
                return false;
            }

            if (stat === "directory" && filename === "dist") {
                return false;
            }

            if (stat === "directory" && filename === "react-native-simple-elements") {
                return false;
            }

            return true; // remind to return a true value when file check passed.
        },
    }
);

// const snapDomFolders = ['assets', 'components', 'utils'];
// copyDirSync(
//   snapDomFolders,
//   './assets',
//   './dist/assets'
// );
