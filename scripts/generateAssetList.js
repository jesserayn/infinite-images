const fs = require('fs');
const path = require('path');
const process = require('process')

const staticDirectory = path.join(process.cwd(), 'static');

function getAssetList() {
  function readDirectory(directory) {
    const nodes = fs.readdirSync(directory);

    return nodes.flatMap(node => {
      const absPath = path.join(directory, node);

      if (fs.statSync(absPath).isDirectory()) {
        return readDirectory(absPath);
      } else {
        return [absPath];
      }
    });
  }

  
  const fileList = readDirectory(staticDirectory);

  return fileList.map(f => path.relative(staticDirectory, f));
}

function generateAssetList() {
  const assetList = getAssetList();

  fs.writeFileSync(path.join(staticDirectory, 'index.json'), JSON.stringify(assetList));
  console.log(`Wrote ${assetList.length} assets to ${staticDirectory}/index.json`);
}

console.log(generateAssetList())