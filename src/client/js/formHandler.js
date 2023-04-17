import { checkForName } from './nameChecker'

const postData = async ( url = ' ', data = {} ) => {

	console.log(data);

	const response = await fetch (url, {

		method: 'POST' , //GET, POST, PUT, DELETE, etc.
		credentials: 'same-origin', //include, *same-origin, omit
		headers: {

			'content-Type': 'application/json' ,

		},
		body: JSON.stringify(data),  // Body data type must match "Content-Type" header
	}); 

	try {

		const newData = await response.json ();
		return newData;

	}catch (error) {

		console.log ("error", error); //appropriately handle the error
        
	}

}


async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
	let formURL = formText


	checkForName(formText)
    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8081/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })


	// let newData = await postData('http://localhost:8081/sendText', {formText: formText});
    let newData = await postData('http://localhost:8081/sendURL', {formURL: formURL});
	try {
		console.log(newData);
		document.getElementById('results').innerHTML = 
			`<pre>

				ANALYZED SENTIMENT: 		${newData.agreement}
				ANALYSIS CONFIDENCE: 	${newData.confidence}
				ANALYSIS SUBJECTIVITY: 	${newData.subjectivity}
				ANALYSIS TEXT SAMPLE: 	"${newData.sentence_list[0].text.substring(0,60)}..."<pre/>`;

	} catch (error){

		console.log ("error", error); //appropriately handle the error
        
	}

}




export { handleSubmit }
