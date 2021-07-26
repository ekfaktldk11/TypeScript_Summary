{
    // 어떻게 함수에서 타입을 활용할까 ??


    // // js
    // function jsAdd(num1, num2){ // bad 
    //     return num1 + num2;
    // }

    // // ts
    // function tsAdd(num1: number, num2: number): number {
    //     return num1 + num2
    // }

    // // ------- 

    // // js
    // function jsFetchNum(id){
    //     //code ..
    //     //code ..
    //     return new Promise((resolve, reject) => {
    //         resolve(100);
    //     })
    // }

    // // ts
    // function fetchNum(id: string): Promise<number>{
    //     //code ..
    //     //code ..
    //     return new Promise((resolve, reject) => {
    //         resolve(100);
    //     })
    // }

    // JavaScript => TypeScript
    // Optional parameter -> ? 는 type | undefined 와 같은 의미
    function printName(firstName: string, lastName?: string){
        console.log(firstName);
        console.log(lastName);
    }
    printName('Steve', 'John');
    printName('Jin');

    // Default parameter
    function printMessage(message: string = 'default message'){
        console.log(message);
    }
    printMessage();

    // Rest parameter
    function addNumbers(... num: number[]): number{
        return num.reduce((a, b) => a+b)
    }

    console.log(addNumbers(1,2));
    console.log(addNumbers(1, 2, 4, 7));
}