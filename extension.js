javascript:(function(){
    var rect = document.createElement('div');
    rect.style.position = 'fixed';
    rect.style.top = '50%';
    rect.style.left = '50%';
    rect.style.transform = 'translate(-10%, -90%)';
    rect.style.background = 'white';
    rect.style.border = '1px solid black';
    rect.style.padding = '10px';
    rect.style.width = '300px';
    rect.style.zIndex = '9999';
    rect.style.display = 'flex';
    rect.style.flexDirection = 'column';
    rect.style.alignItems = 'center';
  
    var arrowContainer = document.createElement('div');
    arrowContainer.style.display = 'flex';
    arrowContainer.style.justifyContent = 'pace-between';
  
    var leftArrow = document.createElement('button');
    leftArrow.innerHTML = '&#8592;';
    leftArrow.style.cursor = 'pointer';
    leftArrow.onclick = function(){
      rect.style.left = '0px';
    };
  
    var rightArrow = document.createElement('button');
    rightArrow.innerHTML = '&#8594;';
    rightArrow.style.cursor = 'pointer';
    rightArrow.onclick = function(){
      rect.style.left = 'calc(100% - 300px)';
    };
  
    arrowContainer.appendChild(leftArrow);
    arrowContainer.appendChild(rightArrow);
  
    var inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.style.width = '100%';
    inputBox.style.padding = '5px';
    inputBox.style.border = '1px solid black';
  
    var buttonContainer1 = document.createElement('div');
    buttonContainer1.style.display = 'flex';
    buttonContainer1.style.justifyContent = 'pace-between';
  
    var button1 = document.createElement('button');
    button1.innerHTML = 'Google';
    button1.onclick = function(){
      var inputValue = inputBox.value.trim();
      if (inputValue.toLowerCase() === 'tbse') {
        window.open('https://ahmadlule.github.io/website/input', '_blank');
      } else {
        window.open('https://www.google.com/search?q=' + inputValue, '_blank');
      }
    };
  
    var button2 = document.createElement('button');
    button2.innerHTML = 'YouTube';
    button2.onclick = function(){
      var inputValue = inputBox.value.trim();
      if (inputValue.toLowerCase() === 'tbse') {
        window.open('https://ahmadlule.github.io/website/input', '_blank');
      } else {
        window.open('https://www.youtube.com/results?search_query=' + inputValue, '_blank');
      }
    };
  
    buttonContainer1.appendChild(button1);
    buttonContainer1.appendChild(button2);
  
    var buttonContainer2 = document.createElement('div');
    buttonContainer2.style.display = 'flex';
    buttonContainer2.style.justifyContent = 'pace-between';
  
    var button3 = document.createElement('button');
    button3.innerHTML = 'Bing';
    button3.onclick = function(){
      var inputValue = inputBox.value.trim();
      if (inputValue.toLowerCase() === 'tbse') {
        window.open('https://ahmadlule.github.io/website/input', '_blank');
      } else {
        window.open('https://www.bing.com/search?q=' + inputValue, '_blank');
      }
    };
  
    var button4 = document.createElement('button');
    button4.innerHTML = 'DuckDuckGo';
    button4.onclick = function(){
      var inputValue = inputBox.value.trim();
      if (inputValue.toLowerCase() === 'tbse') {
        window.open('https://ahmadlule.github.io/website/input', '_blank');
      } else {
        window.open('https://duckduckgo.com/?q=' + inputValue, '_blank');
      }
    };
  
    buttonContainer2.appendChild(button3);
    buttonContainer2.appendChild(button4);
  
    var closeButton = document.createElement('button');
    closeButton.innerHTML = 'Close';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function(){
      rect.parentNode.removeChild(rect);
    };
  
    rect.appendChild(arrowContainer);
    rect.appendChild(inputBox);
    rect.appendChild(buttonContainer1);
    rect.appendChild(buttonContainer2);
    rect.appendChild(closeButton);
  
    document.body.appendChild(rect);
  })();