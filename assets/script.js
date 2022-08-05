const root = document.querySelector(':root');
const copyColorButtons = document.querySelectorAll("[data-copy-button]");
const generateColorButtons = document.querySelectorAll("[data-generate-button]");
const changeFormatButtons = document.querySelectorAll("[data-change-format-button]");

//getComputedStyle(root).getPropertyValue('--hue-background');

generateColorButtons.forEach(button => 
{
  button.addEventListener("click", setNewColor)  
});

function setNewColor()
{
  //Sample color campus inside the card:
  let sampleColor = (this.parentNode.parentNode.children[1])
  //Index of this element:
  console.log(Array.from(generateColorButtons).indexOf(this));
  //Subname of the var property that will be changed:
  let rootSubtype = this.classList[0];
  updateValues(sampleColor, rootSubtype);
  //console.log(getComputedStyle(this).getPropertyValue(`--hue-${rootSubtype}`));
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
  sampleColor.style.setProperty(`--hue`, `${newHue}`);
  sampleColor.style.setProperty(`--saturation`, `${newSaturation}%`);
  sampleColor.style.setProperty(`--luminosity`, `${newLuminosity}%`);
  root.style.setProperty(`--hue-${category}`, `${newHue}`);
  root.style.setProperty(`--saturation-${category}`, `${newSaturation}%`);
  root.style.setProperty(`--luminosity-${category}`, `${newLuminosity}%`);
}