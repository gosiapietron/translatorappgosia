var express = require('express'),
		app	= express();
app.set('view engine', 'ejs')

bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


var mySentences=[]

app.get('/',(req,res)=>{
res.render('index',{mySentences})
})

app.post('/sentences',function(req,res){
	var sentence = req.body.sentence;
	var obj={sentence:sentence, translations:[]}
	mySentences.push(obj)
		res.render('index',{mySentences})


})

app.get('/sentences/:sentence/update',(req,res)=>{
	var oldSentence= req.params.sentence
res.render('updatebutton', {oldSentence})
})

app.post('/sentences/:sentence/update',function(req,res){
	var oldSentence= req.params.sentence
	var sentence = req.body.sentence
	for (var i=0; i<=mySentences.length-1;i++){
		if(mySentences[i]['sentence']===oldSentence){
		mySentences.splice(i,1)
		}
	}

	var obj={sentence:sentence}
	mySentences.push(obj)

	res.render('index',{mySentences})

})


app.get('/sentences/:sentence/delete',(req,res)=>{
	var sentence = req.params.sentence
	res.render('index', {sentence})
})


app.post('/sentences/:sentence/delete',function(req,res){
	var sentence = req.params.sentence
	for (var i=0; i<=mySentences.length-1;i++){
		if(mySentences[i]['sentence']===sentence){
		mySentences.splice(i,1)
		}
	}
		res.render('index',{mySentences})
})


app.get('/sentences/:sentence/translate',(req,res)=>{
	var sentence = req.params.sentence
	res.render('addbutton', {sentence})
})

app.post('/sentences/:sentence/translate',function(req,res){
	var sentence= req.params.sentence
	var lang = req.body.language
	var translation= req.body.translation
	for (var i in mySentences){		
		if(mySentences[i]['sentence']===sentence){
		mySentences[i]['translations'].push({language:lang, translation:translation})
		}		
	} 
	 res.render('index',{mySentences})
})


app.get('/sentences/:sentence/delete/:lang',(req,res)=>{
	var sentence = req.params.sentence
	var lang=req.params.lang
	res.render('index', {sentence,lang})
})


app.post('/sentences/:sentence/delete/:lang',function(req,res){
	var sentence = req.params.sentence
	var lang=req.params.lang
 	for(var i in mySentences){ 
		if(mySentences[i]['sentence']===sentence){
			for(var x in mySentences[i].translations){
				if(mySentences[i].translations[x]['language']===lang){
				mySentences[i].translations.splice(x,1)
				}
			}
		}		
	}
		res.render('index',{mySentences})
})

app.get('/sentences/:sentence/update/:lang',(req,res)=>{
	var sentence = req.params.sentence
	var oldLang=req.params.lang
	res.render('updateform', {sentence,oldLang})
})

app.post('/sentences/:sentence/update/:lang',function(req,res){
	var sentence = req.params.sentence
	var oldLang=req.params.lang
	var newLang=req.body.newLang
	for(var i in mySentences){ 
		if(mySentences[i]['sentence']===sentence){
			for(var x in mySentences[i].translations){
				console.log(mySentences[i].translations[x])
				if(mySentences[i].translations[x]['language']===oldLang){
				mySentences[i].translations.splice(x,1)
				}
								
			}	
						
				mySentences[i].translations.push({language:oldLang, translation:newLang})
	}
	}	

	res.render('index',{mySentences})

})






app.listen (3009, function (){

console.log('Example app listening on port 3009!')



})