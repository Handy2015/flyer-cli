/**
 * 脚手架工具包
 * @author jianmin3
 * 复制文件用到node的fs模块，readFile,writeFile功能，二者原理是将文件内容读取保存在内存中，然后再一次性写入一个文件；
 * 这样就会遇到一个问题：如果文件比较大，一次性读取和写入，会比较吃内存，遇到大文件内存可能爆表；
 * 所以使用createReadStream和createWriteStream，使用这俩个方法就像是从水龙头取水，意思就是边读边写；
 */
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

// 读写时的参数，可以设置为默认
const readOption = {
  flags: "r",
  encoding: 'utf-8',
  mode: 0666,
  autoClose: true
}
const writeOption = {
  flags: 'a',
  encoding: 'utf-8',
  mode: 0666,
  autoClose: true
}

/**
 * 这里要用Stream流信息处理方式，就是读着写着，像有水管一样，上面流着，下面接着，这样可行性就更高了
 * @param {*} origin 处理的文件路劲集合
 * @param {*} aim 
 */
function copy (targetPath, copyPath) {
  // fs.createReadStream(copyPath).pipe(fs.createWriteStream(targetPath))
  let _fileReadStream = fs.createReadStream(copyPath, readOption)
  let _fileWriteStream = fs.createWriteStream(targetPath, writeOption)
  _fileReadStream.pipe(_fileWriteStream)
  _fileReadStream.on('open', function () {
    // console.log("开始读取文件流！");
  })
  _fileReadStream.on('end', function () {
    // console.log(chalk.green('文件流读取完毕！'))
    _fileWriteStream.end();
  })
  _fileReadStream.on('close', function () {
    console.log(chalk.green('文件拷贝完毕！'))
  })
  _fileReadStream.on('error', function (err) {
    console.log(chalk.red('读取文件失败！'))
  })
}

/**
 * path, 被创建目录的完整路径及目录名
 * @param {*} dirName 被创建的目录名称
 * @param {*} callback 创建完成后的回调函数, 其中包含一个参数<err>为错误对象
 */
function createDir (dirName, callback) {
  let _path = __dirname + '/' + dirName
  fs.mkdir(_path, callback)
}

/**
 * 读取文件
 * @param {String} filename 必选参数，文件名
 * @param {Object} options 可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 */
function readFile(filename, options, callback) {
  let _path = path.resolve(__dirname, '..')
  fs.readFile(_path + filename, options, callback)
}

/**
 * 深度遍历文件夹
 * @param {*} dir           文件夹路劲
 * @param {*} callback      回调函数
 * @param {*} copyMap       部分要拷贝文件名称
 */
function travelSync(dir, callback, copyMap) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file)
    if (fs.statSync(pathname).isDirectory()) {
      callback(pathname, file, 'dir')
      travelSync(pathname, callback, copyMap)
    } else {
      if (copyMap) {
        (copyMap.indexOf(file) >= 0) && callback(pathname, file)
      } else {
        callback(pathname, file, 'file')
      }
    }
    // console.log(chalk.green('文件拷贝完毕！'))
  })
}
// 示例：外部调用travelSync 来遍历文件夹时，需要这么写，用来确保文件路径有效
// travelSync('./app', function (pathname, file, fileType) {
//   if (pathname && fileType === 'file') {
//     copy('目标文件路径', '要拷贝的文件路劲')
//   } else if (pathname && fileType === 'dir') {
//     createDir('要创建的文件夹路劲')
//   }
// })

/**
 * 拆分路径
 * @param {String} path  文件路径
 */
function splitPath(path) {
  let paths = []
  path.split('/').forEach(pathName => {
    if (pathName) {
      paths.push('/' + pathName)
    }
  })
  return paths.join('')
}

module.exports = {
  copy,
  createDir,
  readFile,
  splitPath,
  travelSync
}
