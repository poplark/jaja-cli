#!/usr/bin/env node
"use strict";

const program = require('commander'),
  colors = require('colors');

const { version } = require('./package.json');

const CommandVersion = version;

/*
 * 初始化项目
*/
const init = (name, options) => {
  console.log('init project "%s" with "%s" description', name, options.description);
}
program
  .version(CommandVersion)
  .command('init <name>')
  .description('初始化项目')
  .option('-d, --description <description>', '添加项目描述')
  .action(init)

/*
 * 构建项目
*/
const build = (options) => {
  console.log('build project to %s', options.output);
}
program
  .command('build')
  .description('构建项目')
  .option('-o, --output <path>', '输入至 path', './build')
  .option('-p, --production', '以产品形势构建', false)
  .action(build)

/*
 * 部署项目
*/
const list = (val) => {
  return val.split(',');
}
const deploy = (options) => {
  console.log('deploying project to %s'
    , options.chdir
    , ' with config file: '
    , options.config
    , ' into server: '
    , options.list
  );
}
program
  .command('deploy')
  .description('部署项目')
  .option('-C, --chdir [value]', '设置服务器节点', '/opt/www')
  .option('-c, --config [value]', '设置配置文件','./config/deploy.conf')
  .option('-l, --list <items>', 'IP列表', list)
  .action(deploy)

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(colors.red);
}
