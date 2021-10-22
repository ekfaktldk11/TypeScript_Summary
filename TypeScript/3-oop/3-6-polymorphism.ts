{// local scope
    // Encapsultaion
    type CoffeeCup = {
        shots: number;
        hasMilk?: boolean; // optional - hasSome 이 있을 수 도 있고 없을 수 도 있고 ~
        hasSugar?: boolean;
    };

    /*
        polymorphism (다형성)
        - 다형성을 이용하면 한가지의 클래스나 
        한가지의 인터페이스로 다른 방식으로 구현한 클래스를 만들 수 있음!
    */
    
    // 커피를 만드는 기능만을 보유한 인터페이스
    interface CoffeeMaker{
       makeCoffee(shots: number): CoffeeCup;
    }
    
    class CoffeeMachine implements CoffeeMaker { // 'CoffeeMachine 클래스는 CoffeeMaker라는 인터페이스를 구현하는 클래스 입니다' 라는 의미
        private static BEANS_GRAM_PER_SHOT: number = 7; // class level
        private coffeeBeans: number = 0; // instance (object) level

        constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans;

        }
        
        static makeMachine(coffeeBeans: number): CoffeeMachine{
            return new CoffeeMachine(coffeeBeans);
        }

        fillCoffeeBeans(beans: number) {
            if(beans < 0) {
                throw new Error('value for beans should be greater than 0');
            }
            this.coffeeBeans += beans;
        }

        clean() {
            console.log('cleaning the machine...');
        }

        private gridBeans(shots : number){
            console.log(`grinding beans for ${shots}`);
            if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT){
                throw new Error('Not enough coffee beans!');
            }
            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
        }

        private preheat(): void{
            console.log('heating up... ');
        }

        private extract(shots: number): CoffeeCup {
            console.log(`Pulling ${shots} shots...`); // 커피내리는중
            return {
                shots,
                hasMilk: false,
            };
        }

        makeCoffee(shots: number): CoffeeCup {
            this.gridBeans(shots); // 커피를 갈아야함
            this.preheat(); // 커피기계를 따듯하게 데움
            return this.extract(shots); // 커피물을 내려서 추출
        }
    }

    class CaffeeLatteMachine extends CoffeeMachine{
        constructor(beans: number, public readonly serialNumber: string){ // readonly : 한번 설정하면 바뀌지 않는 값들 앞에 붙여줌
            super(beans);
        }
        // CaffeeLatteMachine 에서만 사용될 steamMilk()
        private steamMilk(): void {
            console.log('Steaming some milk...');
        }

        makeCoffee(shots: number): CoffeeCup {
            /*
                CaffeeLatteeMachine 에서 makeCoffee() 를 수정하려는데,
                부모에 있는 makeCoffee()에서 기능(여기서는 '절차'라는 의미가 더 와닿을 듯)을 더 추가하려 할 때
                일일이 부모의 makeCoffee()를 다 작성할 필요 없이 super() 라는 함수를 이용하면 됨
            */
            const coffee = super.makeCoffee(shots); // 부모의 makeCoffee() 의 가열하고 그라인딩하는 작업을 다 하도록 함
            this.steamMilk(); // 그리고 우유만 부음
            return {
                ...coffee, // spreading 을 통해 위에 생성한 coffee를 그대로 사용하면서 ...
                shots,
                hasMilk: true,
            }
        }
    }
    class SweetCoffeeMaker extends CoffeeMachine {
        makeCoffee(shots: number): CoffeeCup {
            const coffee = super.makeCoffee(shots);
            return {
                ...coffee,
                hasSugar: true
            }
        }
    }
    /*
        SweetCoffeeMaker&CaffeeLatteMachine 은 CoffeeMachine 이고
        CoffeeMachine 은 CoffeeMaker 라는 인터페이스를 구현하는 클래스 이다.
        따라서! SweetCoffeeMaker&CaffeeLatteMachine 도 CoffeeMaker 라는 인터페이스를 구현하는 클래스 이다.
    */

    // 위 주석의 특성을 이용하여 CoffeeMaker[] 타입으로 생성가능
    const machines: CoffeeMaker[] = [
        new CoffeeMachine(16),
        new CaffeeLatteMachine(16, '1'),
        new SweetCoffeeMaker(16),
        new CoffeeMachine(16),
        new CaffeeLatteMachine(16, '1'),
        new SweetCoffeeMaker(16)
    ]
    // machines 은 CoffeeMaker[] 타입이므로 CoffeeMaker 인터페이스에 규약된 makeCoffee() 만 사용가능
    machines.forEach(machine => {
        console.log('---------------------');
        machine.makeCoffee(1);
    });
    // 여기서 다형성 최고 장점!!
    /*
        내부적으로 구현된 다양한 클래스들이 한가지 인터페이스를 구현하거나
        또는 동일한 부모클래스를 상속했을 때 위처럼 동일한 함수를 어떤 클래스인지 구분하지 않고
        공통된 API를 호출할 수 있는것이 가장 큰 장점 !
    */

    //const machine = new CoffeeMachine(23);
    const latteMachine = new CaffeeLatteMachine(23, 'SSSS');
    const coffee = latteMachine.makeCoffee(1);
    console.log(coffee);
    console.log(latteMachine.serialNumber);
}