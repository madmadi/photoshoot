
const express     = require('express'),
		fs					= require('fs'),
		mkpath			= require('mkpath'),
    ejs         = require('ejs'),
    bodyParser  = require('body-parser'),
    tree        = require('directory-tree')('gallery'),
    // lwip				= require('lwip'), // lwip@v0.0.9 has issue with node 6
    imagemin		= require('imagemin'),
    im_jpegrec	= require('imagemin-jpeg-recompress'),
    app         = express();

let widthRatio = 2816,
		heightRatio = 2112;
		
let config = JSON.parse(fs.readFileSync('./config.json'))

app.engine('html', require('ejs').renderFile)
app.set('views', __dirname + '/view')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/photo/hq/gallery', express.static(__dirname + '/gallery'))
app.use('/photo/mq/gallery', express.static(__dirname + '/gallery/.mq'))

// Disable multi photo size support
app.use('/photo/mq/gallery', express.static(__dirname + '/gallery/'))
app.use('/photo/lq/gallery', express.static(__dirname + '/gallery/'))

// Multi photo size support (medium quality, low quality)
// app.use('/photo/mq/gallery/*', function(request, response, next){
// 	var mqPath = 'gallery/.mq/' + request.params[0],
// 		mqDir  = mqPath.replace(/\/[^\/]*\.[^\/\.]*$/gi, ''),
// 		hqPath = 'gallery/' + request.params[0]
// 	//if(fs.lstatSync(hqPath).isDirectory()) mqDir = mqPath;
// 	lwip.open(hqPath, function(error, image){
// 		image.contain(widthRatio/4, heightRatio/4, function(error, image){
// 			image.toBuffer('jpg', function(error, buffer){
// 				response.type('jpg')
// 				response.end(buffer)
// 				mkpath(mqDir, function (error) {
// 					if (error) throw error;
// 					fs.writeFile(mqPath, buffer, function(error) {
// 						if (error) throw error;
// 						imagemin([mqPath], mqDir, { plugins: [ im_jpegrec({ quality: 'low' }) ] })
// 					})
// 				})
// 	});});});
// })
// app.use('/photo/lq/gallery', express.static(__dirname + '/gallery/.lq'))
// app.use('/photo/lq/gallery/*', function(request, response, next){
// 	var lqPath = 'gallery/.lq/' + request.params[0],
// 		lqDir  = lqPath.replace(/\/[^\/]*\.[^\/\.]*$/gi, ''),
// 		hqPath = 'gallery/' + request.params[0]
// 	//if(fs.lstatSync(hqPath).isDirectory()) lqDir = lqPath;
// 	lwip.open(hqPath, function(error, image){
// 		image.contain(widthRatio/16, heightRatio/16, function(error, image){
// 			image.toBuffer('jpg', function(error, buffer){
// 				response.type('jpg')
// 				response.end(buffer)
// 				mkpath(lqDir, function (error) {
// 					if (error) throw error;
// 					fs.writeFile(lqPath, buffer, function(error) {
// 						if (error) throw error;
// 						imagemin([lqPath], lqDir, { plugins: [ im_jpegrec({ quality: 'low' }) ] })
// 					})
// 				})
// 	});});});
// })

// Routes
app.get('/', function(request, response){
    response.render('index.html', { tree, config })
})

app.get('/tree', function(request, response){
    response.json(tree)
})
//-

app.listen(4000, function(){
    console.log('Photo shoot is running on http://127.0.0.1:' + this.address().port);
})
