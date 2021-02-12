import {datosModelo, datosOs, datosRam, datosHdd, datosExtras} from './precios.js';

const calcular = document.querySelector('#calcular');
const allInputs = document.querySelectorAll('[name]');

allInputs.forEach(input => {
  input.addEventListener('change',calcularPrecio)
});

let precioFinal = 0;

const img1 = document.querySelector('.tipoModelo img:first-of-type');
const img2 = document.querySelector('.tipoModelo img:last-of-type');
const radio1 = document.querySelector('[name=modelo]:first-of-type');
const radio2 = document.querySelector('[name=modelo]:last-of-type');
radio1.addEventListener('click', () => {
  img1.classList.add('seleccionado');
  img2.classList.remove('seleccionado');
});

radio2.addEventListener('click', () => {
  img2.classList.add('seleccionado');
  img1.classList.remove('seleccionado');
});


function calcularPrecio(e) {
  e.preventDefault();
  precioFinal = 0; // Si recalculan, pone el precio a cero

  /* Cacheo formularios valores elegidos */
  let modelos = document.querySelectorAll('[name=modelo]');
  const os = document.querySelector('[name=os]');
  const ram = document.querySelector('[name=ram]');
  const hdd = document.querySelector('[name=hdd]');

  const office = document.querySelector('[name=office]');
  const antivirus = document.querySelector('[name=antivirus]');
  const servicio = document.querySelector('[name=servicio]');

  /* Calcular incrementos de precio según lo elegido */
  for (let i = 0; i < modelos.length; i++) {  // Incremento modelo
    if(modelos[i].checked) {
      precioFinal += datosModelo[modelos[i].value];
      modelos = modelos[i].value;
    };
  }
  precioFinal += datosOs[os.value]; // Incremento OS
  precioFinal += datosRam[ram.value]; // Incremento RAM
  precioFinal += datosHdd[hdd.value]; // Incremento HDD

  if (office.checked) { precioFinal += datosExtras.office; };
  if (antivirus.checked) { precioFinal += datosExtras.antivirus; };
  if (servicio.checked) { precioFinal += datosExtras.servicio; };
  
  const presu = document.querySelector('.presupuesto');
  presu.classList.add('presupuestoActivo');
  presu.innerHTML = '';

  let resultadoOffice = '';
  let resultadoAntivirus = '';
  let resultadoServicio = '';
  
  const infoEmpresa = document.createElement('p');
  infoEmpresa.classList.add('info');
  infoEmpresa.innerHTML = 
  `MR. ROBOT. S.A. <br>
  CIF: 32434324-X <br> 
  TFNO: 612 345 678 <br>`;

  const resultadoModelo = document.createElement('p');
  resultadoModelo.innerHTML = 
  `<span class="carac">Modelo:</span>  <br>
  <span class="eleccion">${modelos}</span> 
  <span class="precio">+${datosModelo[modelos]}€</span>`;

  const resultadoOs = document.createElement('p');
  resultadoOs.innerHTML = 
  `<span class="carac">Sistema operativo:</span> <br>
  <span class="eleccion">${os.options[os.selectedIndex].text}</span>
  <span class="precio">+${datosOs[os.value]}€</span>`;

  const resultadoRam = document.createElement('p');
  resultadoRam.innerHTML = 
  `<span class="carac">Memoria RAM:</span> <br>
  <span class="eleccion">${ram.options[ram.selectedIndex].text}</span>
  <span class="precio">+${datosRam[ram.value]}€</span>`;

  const resultadoHdd = document.createElement('p');
  resultadoHdd.innerHTML = 
  `<span class="carac">Disco duro:</span>  <br>
  <span class="eleccion">${hdd.options[hdd.selectedIndex].text}</span>
  <span class="precio">+${datosHdd[hdd.value]}€</span>`;

  if (office.checked) {
    resultadoOffice = document.createElement('p');
    resultadoOffice.innerHTML = 
    `<span class="carac">Extras:</span>  <br>
    <span class="eleccion">${office.name}</span>
    <span class="precio">+${datosExtras.office}€</span>`;
  };

  if (antivirus.checked) {
    resultadoAntivirus = document.createElement('p');
    resultadoAntivirus.innerHTML =
    `<span class="carac">Extras:</span>  <br>
      <span class="eleccion">${antivirus.name}</span>
      <span class="precio">+${datosExtras.antivirus}€</span>`;
  };

  if (servicio.checked) {
    resultadoServicio = document.createElement('p');
    resultadoServicio.innerHTML =
    `<span class="carac">Extras:</span>  <br>
      <span class="eleccion">${servicio.name}</span>
      <span class="precio">+${datosExtras.servicio}€</span>`;
  };
  
  const resultadoFinal = document.createElement('div');
  resultadoFinal.innerHTML = 
  `<p class="precioFinal">Precio: ${precioFinal}€</p>`;

  presu.append(infoEmpresa, resultadoModelo, resultadoOs, resultadoRam, resultadoHdd, resultadoOffice, resultadoAntivirus, resultadoServicio, resultadoFinal);
}

/* calcular.addEventListener('click', calcularPrecio); */

