
document.addEventListener('DOMContentLoaded', () => {	
	document.getElementById('ai_form').addEventListener('submit', async (ev) => {
		ev.preventDefault();

		let input = document.getElementById('ai_input').value;

		document.getElementById('loadChat').disabled = true;
		document.getElementById('loadChat').value = 'Submitted...';

		document.getElementById('ai_response').classList.remove('hidden');
		document.getElementById('ai_response').innerText = 'Thinking...';

		let request = {'ai_input': input };
		if ( document.getElementById('ai_input').classList.contains('emo') ) {
			request.emo = true;
		}

		fetch('/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(request)
		}).then(response => response.json()).then(response => {
			console.log(response);
			document.getElementById('ai_response').innerText = response.ai_output;
			document.getElementById('loadChat').disabled = false;
			document.getElementById('loadChat').value = 'Ask your question!';
		});

	});
	document.getElementById('loadChat').addEventListener('click', async (ev) => {
		ev.preventDefault();

		let input = document.getElementById('ai_input').value;

		document.getElementById('loadChat').disabled = true;
		document.getElementById('loadChat').value = 'Submitted...';

		document.getElementById('ai_response').classList.remove('hidden');
		document.getElementById('ai_response').innerText = 'Thinking...';
		
		let request = {'ai_input': input };
		if ( document.getElementById('ai_input').classList.contains('emo') ) {
			request.emo = true;
		}

		fetch('/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(request)
		}).then(response => response.json()).then(response => {
			console.log(response);
			document.getElementById('ai_response').innerText = response.ai_output;
			document.getElementById('loadChat').disabled = false;
			document.getElementById('loadChat').value = 'Ask your question!';
		});
	});
});