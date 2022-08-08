const root = document.querySelector(':root');
const copyColorButtons = document.querySelectorAll("[data-copy-button]");
const generateColorButtons = document.querySelectorAll("[data-generate-button]");
const formatColorButtons = document.querySelectorAll("[data-change-format-button]");
const colorOptionsButtons = document.querySelectorAll("[data-options-button]");
const formatSubmenus = document.querySelectorAll("[data-format-container]");
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
  button.addEventListener("click", setNewColor)  
});

function setNewColor()
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
  
  sampleColor.style.setProperty("--hue", `${newHue}`);
  sampleColor.style.setProperty("--saturation", `${newSaturation}%`);
  sampleColor.style.setProperty("--luminosity", `${newLuminosity}%`);

  let newTextColor;
  newLuminosity < 50 ? newTextColor = `hsl(${360 - newHue}, ${ 100 - newSaturation}%, 100%)`
                       :
                       newTextColor = `hsl(${360 - newHue}, ${ 100 - newSaturation}%, 0%)`;
  sampleColor.style.setProperty("color", newTextColor);
  sampleColor.innerText = `hsl(${newHue}, ${newSaturation}%, ${newLuminosity}%)`;
  
  root.style.setProperty(`--hue-${category}`, `${newHue}`);
  root.style.setProperty(`--saturation-${category}`, `${newSaturation}%`);
  root.style.setProperty(`--luminosity-${category}`, `${newLuminosity}%`);
}

Array.from(formatColorButtons).forEach(button =>
{
  button.addEventListener("click", ()=>
  {
    hideToggler(button.parentNode);
    hideToggler(button.parentNode.parentNode.children[3]);
  })
})

function hideToggler(elementToToggle)
{
  elementToToggle.classList.toggle("hide")
}

Array.from(formatSubmenus).forEach(submenu =>
{
  for (let i = 0; i < 3; i++) 
  {
    submenu.children[i].addEventListener("click", ()=>
    {
      //Pass the sampleColor and current format:
      formatConversor(submenu.parentNode.children[1], submenu.children[i])
    })
  }

  submenu.children[3].addEventListener("click", () => 
  {
    submenu.parentNode.children[2].classList.remove("hide");
    submenu.classList.add("hide");
  })
});

function formatConversor(sampleColor, typeToConvert)
{
  if (typeToConvert.innerText.toLowerCase().charAt(0) === sampleColor.innerText.charAt(0))
    return
  
  switch (typeToConvert.innerText.toLowerCase().charAt(0)) 
  {
    case 'h':
    //Remove "rgb", then "()", then " " and finally ",", returning an Array of Numbers:
    if(sampleColor.innerText.toLowerCase().charAt(0) === 'r')
    {
      let colors = sampleColor.innerText.slice(3).slice(1, -1).replaceAll(' ','').split(',');
      let rgbConvertedToHsl = rgbToHsl(colors[0], colors[1], colors[2]);
      sampleColor.innerText = `hsl(${rgbConvertedToHsl[0]}, ${rgbConvertedToHsl[1]}%, ${rgbConvertedToHsl[2]}%)`;
    }
    else
    {
      let colors = sampleColor.innerText.replace('#', '');
      let hexConvertedToRgb = [];

      for (let i = 0; i < 3; i++) 
      {
        hexConvertedToRgb[i] = parseInt(colors.slice(2*i, 2*(i+1)), 16);
      }
      
      rgbConvertedToHsl = rgbToHsl(hexConvertedToRgb[0], hexConvertedToRgb[1], hexConvertedToRgb[2]);
      sampleColor.innerText = `hsl(${rgbConvertedToHsl[0]}, ${rgbConvertedToHsl[1]}%, ${rgbConvertedToHsl[2]}%)`;
    }
    break;
    
    case 'r':
    //hslToRgb(r, g, b)
    if(sampleColor.innerText.toLowerCase().charAt(0) === 'h')
    {
      //Remove "hsl", then "()", then " " and "%" and finally ",", returning an Array of Numbers:
      let colors = sampleColor.innerText.slice(3).slice(1, -1).replaceAll(' ','').replaceAll('%', '').split(',');
      let hslConvertedToRgb = hslToRgb( colors[0], colors[1], colors[2]);
      sampleColor.innerText = `rgb(${hslConvertedToRgb[0]}, ${hslConvertedToRgb[1]}, ${hslConvertedToRgb[2]})`;
    }
    else
    {
      let colors = sampleColor.innerText.replace('#', '');
      let hslConvertedToRgb = [];

      for (let i = 0; i < 3; i++) 
      {
        hslConvertedToRgb[i] = parseInt(colors.slice(2*i, 2*(i+1)), 16);
      }

      sampleColor.innerText = `rgb(${hslConvertedToRgb[0]}, ${hslConvertedToRgb[1]}, ${hslConvertedToRgb[2]})`;    
    }
    break;
    
    case '#':
    if(sampleColor.innerText.toLowerCase().charAt(0) === 'h')
    {
      //Remove "hsl", then "()", then " " and "%" and finally ",", returning an Array of Numbers:
      let colors = sampleColor.innerText.slice(3).slice(1, -1).replaceAll(' ','').replaceAll('%', '').split(',');
      let hslConvertedToRgb = hslToRgb( colors[0], colors[1], colors[2]);
      
      sampleColor.innerText = `#${hslConvertedToRgb[0].toString(16).padStart(2,'0')}${hslConvertedToRgb[1].toString(16).padStart(2,'0')}${hslConvertedToRgb[2].toString(16).padStart(2,'0')}`;
    }
    else
    {
      //Remove "rgb", then "()", then " " and "%" and finally ",", returning an Array of Numbers:
      let colors = sampleColor.innerText.slice(3).slice(1, -1).replaceAll(' ','').replaceAll('%', '').split(',');
      console.log(colors)
      sampleColor.innerText = `#${parseInt(colors[0], 10).toString(16).padStart(2,'0')}${parseInt(colors[1], 10).toString(16).padStart(2,'0')}${parseInt(colors[2], 10).toString(16).padStart(2,'0')}`;
    }
    break;
  }

}

function hslToRgb(h, s, l)
{
  s /= 100;
  l /= 100;
  // input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
  let a = s * Math.min(l, 1-l);
  let f = (n,k = (n+h / 30)%12) => l - a * Math.max(Math.min(k-3,9-k,1),-1);
  return [Math.round(f(0)*255), Math.round(f(8)*255), Math.round(f(4)*255)];
}

function rgbToHsl(r,g,b) 
{
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100 and round up
  s = Math.floor(s*100);
  l = Math.floor(l*100);

  return [h, s, l];
}

Array.from(colorOptionsButtons).forEach(button =>
  {
    button.addEventListener("click", ()=>
    {
      hideToggler(button.parentNode);
      hideToggler(button.parentNode.parentNode.children[4]);
    })
  })

Array.from(colorControls).forEach(submenu =>
{
  /*
  for (let i = 0; i < 3; i++) 
  {
    submenu.children[i].addEventListener("click", ()=>
    {
      //Pass the sampleColor and current format:
      formatConversor(submenu.parentNode.children[1], submenu.children[i])
    })
  }
  */

  //Closes this submenu and opens the main:
  submenu.children[1].addEventListener("click", () => 
  {
    submenu.parentNode.children[2].classList.remove("hide");
    submenu.classList.add("hide");
  })
});