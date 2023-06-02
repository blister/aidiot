
document.addEventListener('DOMContentLoaded', () => {	
	document.getElementById('loadChat').addEventListener('click', async (ev) => {
		ev.preventDefault();

		let input = document.getElementById('ai_input').value;

		document.getElementById('loadChat').disabled = true;
		document.getElementById('loadChat').value = 'Submitted...';

		document.getElementById('ai_response').classList.remove('hidden');
		document.getElementById('ai_response').innerText = 'Thinking...';

		fetch('/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 'ai_input': input  })
		}).then(response => response.json()).then(response => {
			console.log(response);
			document.getElementById('ai_response').innerText = response.ai_output;
			document.getElementById('loadChat').disabled = false;
			document.getElementById('loadChat').value = 'Load ChatGPT Response';
		});
	});
});