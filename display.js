
addEventListener('load',function(){
	var xhr = new XMLHttpRequest();
	xhr.open('get','./options.json',false);
//	xhr.send()
	var options = //JSON.parse(xhr.responseText);
{
	head: [
		{next:'compsci', value:"Computer Science"},
		{next:'eleceng', value:"Electrical Engineering"},
		{next:'libarts', value:"Liberal Arts"},
		{next:'biology', value:"Biology"},
	],
	compsci: [
		{next: undefined, value:"Programming"},
		{next: undefined, value:"Graphics Design"},
	],
	eleceng: [
		{next: undefined, value:"Electrical Engineering"},
		{next: undefined, value:"Mathematics"},
		{next: undefined, value:"Physics"},
	],
	libarts: [
		{next: undefined, value:"Literature"},
		{next: undefined, value:"Philosophy"},
		{next: undefined, value:"Social Science"},
		{next: undefined, value:"History"},
		{next: undefined, value:"PolySci"},
	],
	biology: [
		{next: undefined, value:"Biology"},
		{next: undefined, value:"Botany"},
		{next: undefined, value:"Zoology"},
	],
};
	var school = undefined;
	location.href.split('?',2)[1]  //The characters after the "?" in the url
		.replace(/([^=&]+)=([^=&]+)(?:&|$)/g,function(_match,key,value,_stringIndex){ //Loop over "(key1)=(value1)&(key2)=(value2)&..." in string
			if (+key == 0) {
				document.body.className = "iframe-body " + options.head[key].next;
				school = +value
			}else with (document.getElementsByClassName("display")[0].appendChild(document.createElement('div'))){ //create a new line of text
				innerHTML = options[options.head[school].next][+value].value; //Add text to the line we created
				className = "title2"
			}
			return "";
		});
});
