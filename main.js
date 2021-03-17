//Variables con cada uno de los botones usando el método getElementById() para seleccionarlos del HTML
const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('oper');
const buttonEqual = document.getElementById('button-equal');
const buttonAc = document.getElementById('button-ac');
const buttonClean = document.getElementById('button-clean');
//Variable de la pantalla de la calculadora
const results = document.getElementById('screen-results');
//Variable donde se guardarán los resultados temporales
let tempResult = '0';
//Variable que guardará el signo del operador
let operator;
//Variables que gauradrán el primer y segundo número
let numberOneSave = null;
let numberTwoSave = null;

//Función que imprime en la pantalla los números pasando como argumento el número
function printOnScreen(number) {
  //Como no entran más de 13 números en la pantalla se pone esa longitud 
    results.value = results.value.length === 13 ? results.value : results.value + number;
}

//Función para los operadores pasando como argumento el operador (cada vez que se mete un operador se limpia la pantalla)
function setOperator(oper) {
    numberOneSave = results.value;
    operator = oper;
    clearDisplay();
}

//Agregamos el evento click con el método addEventListener() los diferentes números y operadores haciendo un for que recorre todos los elementos del html con las clases "numbers" y "operators"
for (const numberButton of numbers) {
    numberButton.addEventListener('click', function() {
        printOnScreen(numberButton.innerHTML);
    });
}
for (const operButton of operators) {
    operButton.addEventListener('click', function() {
        setOperator(operButton.innerHTML);
    });
}

//Método que al presionar el botón "igual" mostrará el restulado
buttonEqual.addEventListener('click', function(){
  numberTwoSave = results.value;
  //Usamos el parseFloat para que las string con los números pasen a ser valores numéricos
  showResult(parseFloat(numberOneSave), operator, parseFloat(numberTwoSave));
});

//Método para limpiar la pantalla al presionar la tecla AC
buttonAc.addEventListener('click', function() {
  clearDisplay();
});

//Método para eliminar el último número si se ha equivocado con la tecla C
buttonClean.addEventListener('click', function() {
  //Al usar el slice le decimos desde dónde empezar para eliminar
  results.value = results.value.toString().slice(0, -1);
});

//Función que imprimirá los botones que se vayan pulsando 
function printButtons () {
  if (tempResult.length <= 5) {
    results.innerText = tempResult;
  }
}

//Función para limpiar la pantalla de la calculadora y reiniciarla
function clearDisplay() {
  results.value = "";
}

//Función para resetear los valores de la calculadora
function resetResults(storedResult) {
  results.value = "";
  numberOneSave = storedResult || null;
  numberTwoSave = null;
  operator = null;
}

//Función que muestra el resultado final pasando como argumentos el primer número, el operador y el segundo número
function showResult (num1, op, num2) {
  //Variable donde se guardará el resultado final
  let finalResult = 0;
  switch (op) {
    case "+":
      finalResult = num1 + num2;
      break;
    case "-":
      finalResult = num1 - num2;
      break;
    case "*":
      finalResult = num1 * num2;
      break;
    case "/":
      finalResult = num1 / num2;
      break;
  }
  //Se muestra el resultado en pantalla
  //Si el usuario quiere seguir operando con el resultado que va saliendo en pantalla
  resetResults(finalResult.toString());
  results.value = finalResult;
}