const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('./public/humaiza.pdf');

pdf.default(dataBuffer).then(function(data) {
    console.log('=== PDF TEXT CONTENT ===');
    console.log(data.text);
    console.log('\n=== PAGE COUNT ===');
    console.log('Pages:', data.numpages);
}).catch(function(error) {
    console.error('Error:', error);
    // Try alternative approach
    pdf(dataBuffer).then(function(data) {
        console.log('=== PDF TEXT CONTENT ===');
        console.log(data.text);
    }).catch(() => {
        console.error('Could not parse PDF');
    });
});
