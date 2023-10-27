/**
 * Auto update version
 */
const fs = require('fs')
const chalk = require('chalk')
const spawn = require('cross-spawn')
let pkg = require('./package.json')

function runCommand(...commands) {
  console.info(commands.join(' '))
  let msg
  for (const command of commands) {
    const temp = typeof command === 'string' ? command.split(' ') : command
    // console.info('command: %s', temp.join(' '))
    const child = spawn.sync(temp.shift(), temp)
    if (child.stdout && child.stdout.length) {
      msg = child.stdout.toString().replace(/^\s*(.+?)\s*$/, '$1')
      if (msg) {
        console.log(msg)
      }
    }
    if (child.stderr && child.stderr.length) {
      msg = child.stderr.toString().replace(/^\s*(.+?)\s*$/, '$1')
      if (msg) {
        console.error(chalk.red(msg))
      }
    }
    if (child.status !== 0) {
      process.exit(child.status)
    }
  }
  return msg
}

const remote = runCommand('git remote')
const branch = runCommand('git branch --show-current')

console.info('Update remote data')
runCommand(`git pull ${remote} ${branch} --no-rebase --verbose`)

console.info('Commit build outputs')

// 提交 package.json
try {
  runCommand('git add .', 'git commit -m build')
} catch (e) {
  // ignore
}
console.info('Update version ...')
const LOCK = process.argv[2] === '--lock-version' || process.argv[2] === '-l'

if (LOCK) {
  console.info('Version locked: ' + pkg.version)
} else {
  let temp = pkg.version.split('.')
  let last = temp.pop()
  last = parseInt(last) + 1
  temp.push(last)

  pkg.version = temp.join('.')

  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), {
    encoding: 'utf-8'
  })

  console.log('New version: ' + pkg.version)

  // 提交 package.json
  console.info('Commit package.json')
  runCommand('git add package.json', ['git', 'commit', '-m', 'update version' + pkg.version])
}

// 创建 tag
console.log('Create git tag: %s', pkg.version)
runCommand(`git tag ${pkg.version}`)

// 推送代码到远程仓库
console.log('Pushing')
runCommand(`git push ${remote} ${branch}:${branch} --tags --progress`)

// 发布
console.log('Publish version onto: %s', pkg.publishConfig.registry)
runCommand('npm publish')

runCommand(`git push --set-upstream ${remote} ${branch}`)

console.info('Package @wangankeji/vue-g6board@%s released', pkg.version)
