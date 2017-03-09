var isdown = require('.');
var meow = require('meow');

const cli = meow(`
    Usage
      $ isdown <input>
    Options
    --url check url
		--time check time
		--webhook webhook url
    Examples
      $ isdown --url "example.com" --time "1 minute" --a "xx" --b "xxx"
`);

isdown(cli.flags);
