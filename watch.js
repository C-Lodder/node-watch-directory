// Require and definitions
const chalk    = require('chalk');
const chokidar = require('chokidar');
const exec     = require('child_process').exec;
const log      = console.log;

// Config
const dir    = 'C:/my/directory';
const script = 'sh shell.sh'; // or 'sh ./shell.sh'

// Initialize watcher
const watcher = chokidar.watch(dir, {
	ignored: /[\/\\]\./,
	persistent: true
});

// Define events and tasks
watcher
	.on('ready', (path) => {
		log(chalk.yellow.bold('Watching...'));
	})
	.on('change', (path) => {
		log('File ' + chalk.cyan.bold(path) + ' has been changed');

		exec(script, (error, stdout, stderr) => {
			if (error) {
				log(chalk.red.bold('There was an error upoading files to VM!'));
				return;
			}

			log(chalk.green.bold('Files successfully uploaded to VM!'));
			log(chalk.yellow.bold('Watching...'));
		});
	});
	
