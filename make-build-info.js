'use strict'

const { spawn } = require('child_process')
const fs = require('fs')

const gitRevParse = spawn('git', ['rev-parse', 'HEAD'])

gitRevParse.stdout.on('data', commitHash => {
  console.log(`commitHash: ${commitHash}`)

  const gitLog = spawn('git', ['log', '-1', '--format=%cd'])
  gitLog.stdout.on('data', logDate => {
    console.log(`logDate: ${logDate}`)

    fs.writeFileSync('./build-info.json', JSON.stringify({
      commitHash: String(commitHash).replace('\n', ''),
      date: String(logDate).replace('\n', ''),
    }, null, '\t'))
  })
})

gitRevParse.stderr.on('data', err => {
  console.log(`Error occurred: ${err}`)
})

gitRevParse.on('close', code => {
  console.log(`Make build process exited with code ${code}`)
})
