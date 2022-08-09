const root = document.querySelector(':root');
const copyColorButtons = document.querySelectorAll("[data-copy-button]");
const generateColorButtons = document.querySelectorAll("[data-generate-button]");
const colorOptionsButtons = document.querySelectorAll("[data-options-button]");
const colorControls = document.querySelectorAll("[data-color-controls-container]");


copyColorButtons.forEach(button =>
{
  button.addEventListener("click", copyColorValue)
})

function copyColorValue()
{
  let sampleColor = (this.parentNode.parentNode.children[1]);
  navigator.clipboard.writeText(sampleColor.innerText);
}

generateColorButtons.forEach(button => 
{
  button.addEventListener("click", getNewColor)  
});

function getNewColor()
{
  //Sample color campus inside the card:
  let sampleColor = (this.parentNode.parentNode.children[1]);
  //Subname of the var property that will be changed:
  let rootSubtype = this.classList[0];
  updateValues(sampleColor, rootSubtype);

}

function getRandomIntInclusive(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateValues(sampleColor, category)
{
  newHue = getRandomIntInclusive(0, 359);
  newSaturation = getRandomIntInclusive(0, 100);
  newLuminosity = getRandomIntInclusive(0, 100);
  
  setNewColor(sampleColor, newHue, newSaturation, newLuminosity, category);
}

function setNewColor(sampleColor, newHue, newSaturation, newLuminosity, category)
{
  sampleColor.style.setProperty("--hue", `${newHue}`);
  sampleColor.style.setProperty("--saturation", `${newSaturation}%`);
  sampleColor.style.setProperty("--luminosity", `${newLuminosity}%`);

  let newTextColor;
  newLuminosity < 50 ? newTextColor = `hsl(${360 - newHue}, ${100 - newSaturation}%, 100%)`
                       :
                       newTextColor = `hsl(${360 - newHue}, ${100 - newSaturation}%, 0%)`;
  sampleColor.style.setProperty("color", newTextColor);
  sampleColor.innerText = `hsl(${newHue}, ${newSaturation}%, ${newLuminosity}%)`;

  root.style.setProperty(`--hue-${category}`, `${newHue}`);
  root.style.setProperty(`--saturation-${category}`, `${newSaturation}%`);
  root.style.setProperty(`--luminosity-${category}`, `${newLuminosity}%`);
}

function hideToggler(elementToToggle)
{
  elementToToggle.classList.toggle("hide")
}

Array.from(colorOptionsButtons).forEach(button =>
  {
    button.addEventListener("click", ()=>
    {
      //Binds sampleColor to colorRacks
      let sampleColor = button.parentNode.parentNode.children[1];
      let colorRacksContainer =  button.parentNode.parentNode.children[3];

      updateColorRack(sampleColor, colorRacksContainer.children[0])

      hideToggler(button.parentNode);
      hideToggler(colorRacksContainer);
    })
  })


function updateColorRack(sampleColor, colorRacks)
{
  let colors = [];

  //Remove "hsl", then "()", then " " and "%" and finally ",", returning an Array of Numbers:
  colors = sampleColor.innerText.slice(3).slice(1, -1).replaceAll(' ','').replaceAll('%', '').split(',');        
      
  for (let i = 0; i < colorRacks.children.length; i++) 
  {
    colorRacks.children[i].children[1].value = colors[i];    
    colorRacks.children[i].children[3].innerText = colors[i];
  }
}

Array.from(colorControls).forEach(submenu =>
{
  for (let i = 0; i < 3; i++) 
  {
    let colorRack = submenu.children[0].children[i].children;

    colorRack[1].addEventListener("change", () => 
    {
      setSampleColorValues(colorRack[1], colorRack[3], "change");
    });

    colorRack[2].addEventListener("click", () => 
    {
      setSampleColorValues(colorRack[1], colorRack[3], "decrement");
    });
    
    colorRack[4].addEventListener("click", () => 
    {
      setSampleColorValues(colorRack[1], colorRack[3], "increment"); 
    });
  }

  //Closes this submenu and opens the main:
  submenu.children[1].addEventListener("click", () => {
    submenu.parentNode.children[2].classList.remove("hide");
    submenu.classList.add("hide");
  });
});

function setSampleColorValues(rangeComponent, valueDisplay, operation)
{
  if(operation == "decrement")
  {
    --rangeComponent.value;
  }
  if(operation == "increment")
  {
    ++rangeComponent.value;
  }

  valueDisplay.innerText = rangeComponent.value;
  let mainMenu = valueDisplay.parentNode.parentNode.parentNode.parentNode.children;

  let colorRacks = valueDisplay.parentNode.parentNode.children;
  let colors = [];

  for (let i = 0; i < colorRacks.length; i++)
  {
    colors[i] = colorRacks[i].children[1].value 
  }

  setNewColor(mainMenu[1], colors[0], colors[1], colors[2], mainMenu[0].innerText.toLowerCase());
}