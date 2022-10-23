#!/usr/bin/env node
import { program } from 'commander'
import { readFileSync } from 'node:fs'
import { Lazri, htmlTransform } from '../lib/esm/lazri.js'

program
  .name('lazri')
  .description('Command line interface to transform text from Lazri to other format.')
  .version('1.0.0', '-v, --version')
  .argument('<file>', 'file to transform from')
  .option('-f, --format [format]', "format to transform to (default: 'json')")
  .action((file, options) => {
    const text = readFileSync(file, 'utf-8')
    const parsed = Lazri.parse(text)
    if (options.format === 'html') {
      console.log(htmlTransform(parsed))
      return
    }
    console.log(JSON.stringify(parsed, null, '  '))
  })

program.parse(process.argv)
