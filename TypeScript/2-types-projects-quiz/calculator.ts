/**
 * Let's make a calculator 🧮
 */

type Command = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';


// function calculate(cal: oper, num1: number, num2 : number): number{
//     switch(cal){
//         case 'add':
//             return num1 + num2;
//         case 'substract':
//             return num1 - num2;
//         case 'remainder':
//             return num1 % num2;
//         case 'multiply':
//             return num1 * num2;
//         case 'divide':
//             return num1 / num2;
//         default:
//             break;
//     }
// }

function calculate(command: Command, a:number, b:number): number {
    switch(command){
        case 'add':
            return a + b;
        case 'substract':
            return a - b;
        case 'remainder':
            return a % b;
        case 'multiply':
            return a * b;
        case 'divide':
            return a / b;
        default:
            throw Error('unknown command');
    }
}

// 내 구상과 엘리의 구상이 일치했음!

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('substract', 3, 1)); // 2
console.log(calculate('multiply', 4, 2)); // 8
console.log(calculate('divide', 4, 2)); // 2
console.log(calculate('remainder', 5, 2)); // 1
