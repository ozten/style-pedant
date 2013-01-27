#!/usr/bin/env node

var fs = require('fs'),
    Step = require('step');

var argv = require('optimist')
  .usage('Usage: $0 [files]')
  .argv;

var exitCode = 0;

function report(file, lineNum, line, issue) {
    process.stdout.write([file + ': line ', (lineNum + 1) + ', ',
                         issue, ' -- [', line, ']\n'].join(''));
}

argv._.forEach(function(file, i) {
  Step(function() {
    fs.readFile(file, 'utf8', this);
    },
    function(err, data) {
      var lines = data.split('\n');
      lines.forEach(function(line, lineNum) {
        //process.stdout.write('.');
        if (line.indexOf('\t') !== -1) {
          report(file, lineNum, line, 'Tabs instead of spaces');
          exitCode = 1;
        }
        if (line.length > 0 && line.charAt(line.length - 1) == ' ') {
          report(file, lineNum, line, 'Line ends in whitespace');
          exitCode = 1;
        }
        // TODO without a .pedanticrc we'll need to concatentate strings here
        if (line.indexOf('function ' + '(') !== -1) {
          report(file, lineNum, line, 'Space before function arguments');
          exitCode = 1;
        }
        if (line.length > 80) {
          report(file, lineNum, line, 'Line is too long at ' +
                 (line.length + 1) + ' characters');
        }
        if (i === argv._.length - 1 &&
            lineNum === lines.length -1) {
          process.exit(exitCode);
        }
        if (line.indexOf('consol' + 'e.log') !== -1) {
          report(file, lineNum, line, 'console logging left in code');
        }
      });
    });
});