const fs = require('fs');
const path = require('path');
const util = require('util');
rmdir = require('rimraf');

let sourcePath = process.argv[2] || './testfolder/';
let destinationName = process.argv[3] || 'sorted';
let delSelector = process.argv[4] || true;

let destinationPath = './' + destinationName + '/';

const readDir = async (base) => {
    let files = await fs.promises.readdir(base);

    await Promise.all(files.map(async item => {
        let itemPath = path.join(base, item);
        let stats = await fs.promises.stat(itemPath);

        if (stats.isDirectory()) {
            await readDir(itemPath);
        } else {
            let letterDirPath = path.join(destinationPath, item.slice(0,1));
            let newPath = path.join(letterDirPath, item);
            if (!fs.existsSync(letterDirPath)) {
                await fs.promises.mkdir(letterDirPath, {recursive: true});
            }
            await fs.promises.rename(itemPath, newPath);
            console.log(`gile ${itemPath} has been moved`)
        }
    }))
};

const runner = async () => {
    try {
        await readDir(sourcePath);
    } catch (error) {
        console.log(error);
    }

    if (delSelector) {
        rmdir(sourcePath, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Directory ${sourcePath} has been deleted`)
            }
        });
    }
}

runner()