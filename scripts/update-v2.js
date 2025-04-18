let fse = require('fs-extra')

let fs = require('fs')
let path = require('path')
let config = require('../src/config.json')
let navs = config.nav

let createIndexConfig = (enName, package) => {
  return new Promise((resolve, reject) => {
    // if (package.show) {
    let name = package.name
    let nameLc = package.name.toLowerCase()
    let dirPath = path.join(__dirname, `../src/packages/${nameLc}`)
    console.log('dirpath', dirPath)
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error(err)
        return
      }

      files.forEach((file) => {
        let filePath = path.join(dirPath, file)

        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error(err)
            return
          }

          let updatedData = data
            .replace(/&__([a-zA-Z0-9]+)/g, '&-$1')
            .replace(/&--([a-zA-Z0-9]+)/g, '&-$1')
            .replace(/&-([a-zA-Z0-9]+)__([a-zA-Z0-9]+)/g, '&-$1-$2')
            .replace(/&-([a-zA-Z0-9]+)--([a-zA-Z0-9]+)/g, '&-$1-$2')
            .replace(/nut-([a-zA-Z0-9]+)__([a-zA-Z0-9]+)/g, 'nut-$1-$2')
            .replace(/nut-([a-zA-Z0-9]+)--([a-zA-Z0-9]+)/g, 'nut-$1-$2')
            .replace(
              /nut-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)__([a-zA-Z0-9]+)/g,
              'nut-$1-$2-$3'
            )
            .replace(
              /nut-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)--([a-zA-Z0-9]+)/g,
              'nut-$1-$2-$3'
            )
            .replace(
              /nut-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)__([a-zA-Z0-9]+)/g,
              'nut-$1-$2-$3-$4'
            )
            .replace(
              /nut-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)--([a-zA-Z0-9]+)/g,
              'nut-$1-$2-$3-$4'
            )
            .replace(
              /nut-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)__([a-zA-Z0-9]+)/g,
              'nut-$1-$2-$3-$4-$5'
            )
            .replace(
              /nut-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)--([a-zA-Z0-9]+)/g,
              'nut-$1-$2-$3-$4-$5'
            )
            .replace(/\$\{([a-zA-Z0-9]+)\}__([a-zA-Z0-9]+)/g, '${$1}-$2')
            .replace(/\$\{([a-zA-Z0-9]+)\}--([a-zA-Z0-9]+)/g, '${$1}-$2')
            .replace(
              /\$\{([a-zA-Z0-9]+)\}-([a-zA-Z0-9]+)__([a-zA-Z0-9]+)/g,
              '${$1}-$2-$3'
            )
            .replace(
              /\$\{([a-zA-Z0-9]+)\}-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)__([a-zA-Z0-9]+)/g,
              '${$1}-$2-$3-$4'
            )
            .replace(
              /\$\{([a-zA-Z0-9]+)\}-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)__([a-zA-Z0-9]+)/g,
              '${$1}-$2-$3-$4-$5'
            )
            .replace(
              /\$\{([a-zA-Z0-9]+)\}__\$\{([a-zA-Z0-9]+)\}/g,
              '${$1}-${$2}'
            )
            .replace(
              /\$\{([a-zA-Z0-9]+)\}--\$\{([a-zA-Z0-9]+)\}/g,
              '${$1}-${$2}'
            )
            .replace(
              /nut-([a-zA-Z0-9]+)-([a-zA-Z0-9]+)__\$\{([a-zA-Z0-9]+)\}/g,
              'nut-$1-$2-${$3}'
            )

          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error(err)
              return
            }

            console.log(`File ${file} processed successfully.`)
          })
        })
      })
    })
    // }
  })
}

function create() {
  navs.map((nav) => {
    nav.packages.map((package) => {
      return createIndexConfig(nav.enName, package)
    })
  })
}

create()
