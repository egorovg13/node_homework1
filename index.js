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
            copyToFolder(item, itemPath, destinationPath);
        }

        console.log('reade to delete now')
    })
};

const copyToFolder = (itemName, itemPath ,destination) => {
    let letterDirPath = path.join(destination, itemName.slice(0,1));
    let newPath = path.join(letterDirPath, itemName);
    const callback = () => {console.log('done')};

    createDirectory(letterDirPath);

    let rs = fs.createReadStream(itemPath)
    let ws = fs.createWriteStream(newPath)
    rs.pipe(ws).on('finish', () => {
        console.log(`done copying file ${itemName}`);
        fs.unlink(itemPath, () => {
            console.log(`File ${itemPath} was deleted`)
        });
    });


    // ws.on('finish', () => {
    //             console.log('done copying a file');
    //         })

    // rs.pipe(ws, 
    //     {end: false}
    //     ).on('end', () => {
    //         console.log('done copying a file');
    //     });

    // fs.createReadStream(itemPath).pipe(fs.createWriteStream(newPath), {end: false}).on('end', data => {console.log('to delete: ' + itemPath)})

}

const createDirectory = (path) => {
    if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    };
}

createDirectory(destinationPath);
readDir(sourcePath);
