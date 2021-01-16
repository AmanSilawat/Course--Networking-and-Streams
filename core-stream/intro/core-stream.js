let spawn = require('child_process').spawn;
let ps = spawn('grep', ['potato']);
ps.stdout.pipe(process.stdout);
ps.stdin.write('cheese\n');
ps.stdin.write('charrots\n');
ps.stdin.write('charrots potatoes\n');
ps.stdin.write('potato!\n');
ps.stdin.end();