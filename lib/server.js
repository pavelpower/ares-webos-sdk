var fs=require("fs"),express=require("express"),http=require("http"),bodyParser=require("body-parser"),spawn=require("child_process").spawn;
(function(){var g={win32:["cmd","/c","start"],darwin:["open"],linux:["xdg-open"]},e={};"undefined"!==typeof module&&module.exports&&(module.exports=e);e.runServer=function(f,a,b,c){"function"!==typeof b||c||(c=b,b=null);f=fs.realpathSync(f);var d=new express;d.use("/",express.static(f));d.use("/ares_cli",express.static(__dirname));d.use(bodyParser.json());d.configure(function(){b&&(d.post("/ares_cli/@@ARES_CLOSE@@",function(c,a,d){b("@@ARES_CLOSE@@",a)}),d.post("/ares_cli/@@GET_URL@@",function(c,
a,d){b("@@GET_URL@@",a)}))});var e=http.createServer(d);e.listen(a,function(a){if(a)return c(Error(a));a=e.address().port;var b="http://localhost:"+a;c(null,{msg:"Local server running on "+b,url:b,port:a})})};e.openBrowser=function(e,a,b){var c=g[process.platform];"function"===typeof a&&(b=a,a=null);a&&("linux"===process.platform&&c.splice(0,1),c=c.concat([a,"--new","--args"]));this.browserProcess=spawn(c[0],c.slice(1).concat([e]));b&&b()}})();