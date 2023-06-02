const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const express = require('express');
const bodyParser =  require('body-parser');
const app = express();

app.use( express.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( express.static('static') ); // static file serving folder
app.set('view engine', 'ejs'); // EJS is an awesome templating engine

let conversations = [];

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/chat', async (req, res) => {
	console.log('/chat', `"${req.body.ai_input}"`);
	let ai_output = 'You must provide an input';

	if ( req.body.ai_input.trim().length > 10 ) { // verify they've sent something
		ai_output = await runCompletion(req.body.ai_input);
	}

	res.json({ 'ai_output': ai_output });
});

async function runCompletion(input) {
	conversations.push({ role: 'user', 'content': input });
	let completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: conversations,
	});

	try {
		let last = lastAnswer();
		conversations.push({ role: 'system', 'content': completion.data.choices[0].message.content });
		if ( Math.random() > .3 && last ) {
			return last.content;
		} else {
			return completion.data.choices[0].message.content;
		}
	} catch(e) {
		console.error(`ChatGPT Error: ${e}`);
		return `There was an error. ${e}`;
	}
}

function lastAnswer() {
	for ( let i = conversations.length; i > 0; i-- ) {
		let convo = conversations[i-1];
		if ( convo.role && convo.role ==  'system' ) {
			return convo;
		}
	}
}

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Web Server starting on ${port}`));