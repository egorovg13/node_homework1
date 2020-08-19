const fs = require('fs');
const path = require('path');
const { ok } = require('assert');

//let sourcePath = process.argv[2];
let sourcePath = './testfolder/'
let delSelector = true;
let destinationName = 'sorted';

let destinationPath = './' + destinationName + '/';


const readDir = (base) => {
    let files = fs.readdirSync(base);

    files.forEach(item => {
        let itemPath = path.join(base, item);
        let itemState = fs.statSync(itemPath);

        if (itemState.isDirectory()) {
            readDir(itemPath);
        } else {
            copyToFolder(item, itemPath, destinationPath)
        }
    })
};

const copyToFolder = (itemName, itemPath ,destination) => {
    let letterDirPath = path.join(destination, itemName.slice(0,1));
    let newPath = path.join(letterDirPath, itemName);
    const callback = () => {console.log('done')};
    // let rs = fs.createReadStream(itemPath)
    // let ws = fs.createWriteStream(newPath)

    createDirectory(letterDirPath);

    // rs.pipe(ws, 
    //     {end: false}
    //     ).on('end', () => {
    //         console.log('done copying a file');
    //     });

    fs.createReadStream(itemPath).pipe(fs.createWriteStream(newPath), {end: false}).on('end', data => {console.log('to delete: ' + itemPath)})

}

const createDirectory = (path) => {
    if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    };
}

createDirectory(destinationPath);
readDir(sourcePath);
