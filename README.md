style-pedant
============

A boorish script that complains about pedantic coding style issues

Current catchs:
* Spaces at the end of a line
* Tabs instead of spaces
* function declarations with a space before the arguments
* Lines of 80 characters
* console.log in code

Pattern matching is dead stupid, but a useful check before committing code.

Script exists with 0 if everything is good, or non-zero if an issue is noted.