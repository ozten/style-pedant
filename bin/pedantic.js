#!/usr/bin/env node

var fs = require('fs'),
    Step = require('step');

var argv = require('optimist')
  .usage('Usage: $0 [files]')
  .argv;

var exitCode = 0;

argv._.forEach(function(file, i) {
  Step(function() {
    fs.readFile(file, 'utf8', this);
    },
    function(err, data) {
      var lines = data.split('\n');
      lines.forEach(function(line, lineNum) {
        //process.stdout.write('.');
        if (line.indexOf('\t') !== -1) {
          console.log(file, ': line', lineNum, ', Tabs instead of spaces --', line);
          exitCode = 1;
        }
        if (line.length > 0 && line.charAt(line.length - 1) == ' ') {
          console.log(file, ': line', lineNum, ', Line ends in whitespace --', line);
          exitCode = 1;
        }
        if (line.indexOf('function (') !== -1) {
          console.log(file, ': line', lineNum, ', Space before function arguments --', line);
          exitCode = 1;
        }
        if (i === argv._.length - 1 &&
            lineNum === lines.length -1) {
          process.exit(exitCode);
        }
      });
    });
});