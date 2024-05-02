// 1. Tree Viewer
const input = document.querySelector(".textarea");
const output = document.querySelector(".output");

function generateTree(){
  const jsonData = input.value;
  try{
    const parsedData = JSON.parse(jsonData);             // the JSON string (here, jsonData) is converted(parsed) into a corresponding json format and if data is valid then it stores data in parsedData variable.
    const treeViewer = createTreeView(parsedData);
    output.value = treeViewer;
  } catch (error){
    alert('Invalid JSON data. Please enter valid JSON.');
  }
}

function createTreeView(data, depth = 0) {
  let result = '';

  for(const key in data){
    if(data.hasOwnProperty(key)){              // hasOwnProperty(key) : checks if the current key is a direct property of the data object
      const value = data[key];
      const indent = ' '.repeat(depth*2);
      result += `${indent}"${key}": `;

      if(typeof value === 'object' && value !== null){
        result += `{\n${createTreeView(value, depth+1)}}`;
      }
      else{
        result += `${JSON.stringify(value)}`;  // JSON.stringify(value): if value is not an object then it converts json value into a string
      }

      result += ',\n';
    }
  }

  return result.slice(0, -2);                // slice(start index, -2 from end) to remove last ',\n' character
}


// 2. Beautify
const btnBeautify = document.querySelector(".beautify");
const space = document.querySelector(".space");

btnBeautify.addEventListener("click",  () =>{
  beautify();
});

function beautify() {
  let spaces=parseInt(space.value);
  const beautified = JSON.stringify(JSON.parse(input.value),null,spaces);  // JSON.stringify(data in json format, replacer, spaces) : (here, replacer is null, means you want the default behavior, which is to include all properties and values in the JSON string without any custom transformations)
  output.value = beautified;
}


// 3. Minify
const btnMinify = document.querySelector(".minify");

btnMinify.addEventListener("click", () => {
  const minified = JSON.stringify(JSON.parse(input.value));
  output.value = minified;
});


// 4. Validate
const btnValidate = document.querySelector(".validate");

btnValidate.addEventListener("click", () => {
  const jsonData = input.value;
  if(isValidJSON(jsonData)){
    alert('JSON data is valid.');
    beautify();
  }
  else{
    alert('Invalid JSON data. Please enter valid JSON.');
  }
});

function isValidJSON(jsonString) {
  try{
    JSON.parse(jsonString);
    return true;
  } catch(error){
    return false;
  }
}


// 5. To XML
const btnXML = document.querySelector(".toXML");

btnXML.addEventListener("click", () => {
  try{
    const jsonData = JSON.parse(input.value);
    const xmlData = jsonToXml(jsonData, 'data');
    output.value = xmlData;
  } catch(error){
    alert('Invalid JSON data. Please enter valid JSON.');
  }
});

function jsonToXml(jsonData, rootName = 'root') {
  let xml = '';

  const parseObject = (obj, indent) => {
    for(const key in obj){
      if(obj.hasOwnProperty(key)){
        const value = obj[key];
        xml += `${indent}<${key}>`;
        if(typeof value === 'object'){
          xml += '\n';
          parseObject(value, indent + '  ');
          xml += `${indent}`;
        }
        else{
          xml += `${value}`;
        }
        xml += `</${key}>\n`;
      }
    }
  };

  xml += `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n`;
  parseObject(jsonData, '  ');
  xml += `</${rootName}>\n`;

  return xml;
}


// 6. From URL
const btnURL = document.querySelector('.URL');

btnURL.addEventListener('click', () => {
  const apiLink = prompt('Enter the API link:');

  if(!apiLink){
    return;
  }

  fetch(apiLink)
    .then(response => {
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data =>{
      input.value = JSON.stringify(data);
    })
    .catch(error =>{
      alert('Error fetching or displaying data: ' + error.message);
    });
})