const root = document.querySelector(':root');
const copyColorButtons = document.querySelectorAll("[data-copy-button]");
const generateColorButtons = document.querySelectorAll("[data-generate-button]");
const formatColorButtons = document.querySelectorAll("[data-change-format-button]");

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
  sampleColor.innerText = `hsl:(${newHue}, ${newSaturation}%, ${newLuminosity}%)`;
  
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

const formatSubmenus = document.querySelectorAll("[data-format-container]");
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
  //console.log(sampleColor.innerText.charAt(0), typeToConvert.innerText.toLowerCase())
  console.log(sampleColor.innerText)
  if (typeToConvert.innerText.toLowerCase().charAt(0) === sampleColor.innerText.charAt(0))
  {
    console.log("already converted")
    return
  }
  
  switch (typeToConvert.innerText.toLowerCase().charAt(0)) 
  {
    //hsl:(232, 70%, 23%); rgb(240, 248, 255); #abcdef
    case 'h':
    //Remove "rgb", then "()", then " " and finally ",", returning an Array of Numbers:
    if(sampleColor.innerText.toLowerCase().charAt(0) === 'r')
    {
      let colors = sampleColor.innerText.slice(3).slice(1, -1).replaceAll(' ','').split(',');
      rgbConvertedToHsl = rgbToHsl(colors[0], colors[1], colors[2]);
      sampleColor.innerText = `hsl:(${rgbConvertedToHsl[0]}, ${rgbConvertedToHsl[1]}%, ${rgbConvertedToHsl[2]}%)`;
      return;
    }

    let colors = sampleColor.innerText.replace("#", '');
    rgbConvertedToHsl = rgbToHsl(parseInt(`${colors[0]}`, 16), parseInt(`${colors[1]}`, 16), parseInt(`${colors[2]}`, 16));
    console.log(`${rgbConvertedToHsl[0]}`);
    sampleColor.innerText = `hsl:(${rgbConvertedToHsl[0]}, ${rgbConvertedToHsl[1]}%, ${rgbConvertedToHsl[2]}%)`;
    break;
    
    case 'r':
    //rgbToHsl(r, g, b)
    if(typeToConvert.innerText.toLowerCase().charAt(0) === 'r')
    {
      //return `set formated value`
    }
    //rgbToHex
    //return `set formated value`
    console.log("r")
    
    break;

    case '#':
    console.log(typeToConvert.innerText.toLowerCase().charAt(0))
    break;
  }

}

function hslToRgb(h, s, l)
{
  let r, g, b;

  if(s == 0)
  {
    r = g = b = l; // achromatic
    return
  }
  let hue2rgb = function hue2rgb(p, q, t)
  
  {
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  let p = 2 * l - q;

  r = hue2rgb(p, q, h + 1/3);
  g = hue2rgb(p, q, h);
  b = hue2rgb(p, q, h - 1/3);
  
  return [Math.min(floor(r*256),255), Math.min(floor(g*256),255), min(floor(b*256),255)];
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
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}
