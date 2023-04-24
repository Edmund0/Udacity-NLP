import { checkForName } from './nameChecker'

const postData = async ( url = ' ', data = {} ) => {

	console.log(data);

	const response = await fetch (url, {

		method: 'POST' , 
		credentials: 'same-origin', 
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


const validator = () => {

	// Building this function was oddly satisfying!

	const protocol 	= "(?:(?:(?:https?|ftp):)?\\/\\/)";								    // PROTOCOL IDENTIFICATION (restricted to http, https, and ftp)
	const auth 		= "(?:\\S+(?::\\S*)?@)?";											// AUTHENTICATION (Optional)

	const ip 		= "(?!(?:10|127)(?:\\.\\d{1,3}){3})"								// EXCLUDES (10.0.0.0 – 10.255.255.255) and (127.0.0.0 – 127.255.255.255)
					+ "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})"					// EXCLUDES (169.254.0.0 – 172.31.255.255) and (192.168.0.0 – 192.168.255.255)
					+ "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})"				// EXCLUDES (172.16.0.0 – 172.31.255.255)
					+ "(?:[1-9]\\d?|1\\d\\d|2[0-1]\\d|22[0-3])"							// FIRST OCTET 				[EXCLUDES 0 AS WELL AS 224 TO 255]
					+ "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}"						// SECOND AND THIRD OCTET 	[ANY NUMBER FROM 0 TO 255]
					+ "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))";					// FINAL OCTET 				[EXCLUDES 0 AND 255]

	const host 		= "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)";		// HOST NAME
	const domain 	= "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*"; // DOMAIN NAME
	const tld 		= "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?";						// TOP-LEVEL-DOMAIN NAME (Optional) *********** [Why does it end in .?] *************

	const port 		= '(?::\\d{2,5})?';													// PORT NUMBER (Optional)
	const path 		= '(?:[/?#][^\\s"]*)?';												// RESOURCE PATJ (Optional)

	const expression =  `(?:${protocol}|www\\.)${auth}(?:${ip}|${host}${domain}${tld})${port}${path}`;	// ********** www. may be unnecessary (confirm www\\.) **********

	const regex = new RegExp(`(?:^${expression}$)`, "ig"); 												// adds enclosing backslashes /.../
	return regex;

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


	if (formText === "") {

		alert("Please Enter URL");

	} else if (formText.match(validator())) {
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
	} else {

		alert("Invalid Input");

	}

}




export { handleSubmit }
