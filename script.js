window.addEventListener('load',function(){
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
		{next: undefined, value:"Bology"},
		{next: undefined, value:"Botany"},
		{next: undefined, value:"Zoology"},
	],
	background: [ "" ],
};
	var form = document.getElementById('form');
	
	form.addEventListener('submit', function(){
		var previewFrame = document.getElementById('preview');
		previewFrame.className = "fullscreen";
		
		function unPreview(){
			previewFrame.className = "preview";
			previewFrame.contentDocument.removeEventListener('click',unPreview);
		}
		previewFrame.contentDocument.addEventListener('click',unPreview);
	});
	
	var numDropdowns = 0;
	
	function addDropDown(opts){
		var self = {
			remove: function(){
					numDropdowns--;
					form.removeChild(self.element);
					if (self.next){
						self.next.remove();
						self.next = undefined;
					}
				},
			element: document.createElement('select'),
			next: undefined,
		};
		
		//Add options to selection
		for (var i in opts){
			var element = document.createElement('option');
			element.innerHTML = opts[i].value;
			element.value = i
			self.element.appendChild(element);
		}
		
		self.element.name = numDropdowns;
		
		//Default selection is unselected
		var defaultSelection = document.createElement('option')
		self.element.appendChild(defaultSelection);
		defaultSelection.selected = true;
		defaultSelection.disabled = true;
		
		self.element.addEventListener('change',function(){
			if (self.next){
				self.next.remove();
				self.next = undefined;
			}
			if (opts[this.selectedIndex].next)
				self.next = addDropDown(options[opts[this.selectedIndex].next]);
			form.submit(); //Update preview
		});
		numDropdowns++;
		form.appendChild(self.element);
		return self;
	}
	addDropDown(options.head);
});

var uploadShown = false;
window.onload = function(){
var uploadHolder = document.getElementById('uploadHolder');
document.getElementById('uploadImage').onclick = function(){
	if(uploadShown){
		uploadHolder.removeChild(document.getElementById('uploadIframe'));
		uploadShown = false;
		return;
	}
	var canvas = document.createElement('iframe');
	canvas.style.position = 'fixed';
	canvas.style.top = '40px';
	canvas.style.right = '20px';
	canvas.style.background = '#DDD';
	canvas.setAttribute('width','40%');
	canvas.setAttribute('height','30%');
	canvas.setAttribute('id','uploadIframe');
	canvas.setAttribute('src','savedImages/upload.html');
	uploadHolder.appendChild(canvas);
	uploadShown = true;
};
};
