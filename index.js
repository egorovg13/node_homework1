const fs = require('fs');
const path = require('path');
const { ok } = require('assert');

let sourcePath = process.argv[2] || './testfolder/';
let destinationName = process.argv[3] || 'sorted';
let delSelector = process.argv[4] || true;

let destinationPath = './' + destinationName + '/';

const readDir = (base) => {
    fs.readdir(base, (error, files) => {
        if (error) { 
            console.log(error); 
          } 
        else { 
            files.forEach(item => {
                let itemPath = path.join(base, item);

                fs.stat(itemPath, (error, stats) => {
                    if (error) {
                        console.log(error)
                    } else {
                        if (stats.isDirectory()) {
                            readDir(itemPath);
                        } else {
                            createFolder(item, itemPath)
                        }
                    }
                })
            })
            }
    })   
}

const createFolder = (itemName, itemPath) => {
    let letterDirPath = path.join(destinationPath, itemName.slice(0,1));
    let newPath = path.join(letterDirPath, itemName);
    
    if (!fs.existsSync(letterDirPath)) {
    fs.mkdir(letterDirPath, {recursive: true}, (error) => {
        if (error) {
            console.log(error);
            return
        }
        console.log(`folder ${letterDirPath} was created!`);
        moveFile(itemPath, newPath);
    });

    } else {
        moveFile(itemPath, newPath);
    }
}

const moveFile = (itemPath, newPath) => {
    console.log(`we will move ${itemPath} to ${newPath}`);

    fs.createReadStream(itemPath).pipe(fs.createWriteStream(newPath)).on('finish', () => {
        let parentDir = path.dirname(itemPath);

        fs.unlink(itemPath, () => {
            console.log(`File ${itemPath} was deleted`);
            if (delSelector) {
                fs.readdir(parentDir, (error, files) => {

                    if (error) {
                        console.log(error);
                        return
                    } else {
                        if (!files.length) {
                            fs.rmdir(parentDir, () => { 
                                console.log(`folder ${parentDir} deleted`); 
                                    fs.readdir(path.dirname(parentDir), (error, files) => {
                                        if (error) {
                                            console.log(error)
                                        } else if (!files.length) {
                                            fs.rmdir(path.dirname(parentDir), (err) => {
                                                if (err) {
                                                }
                                            })
                                        }
                                    })
                            }); 
                        }
                    }
                })}
         });
    });
}

readDir(sourcePath);