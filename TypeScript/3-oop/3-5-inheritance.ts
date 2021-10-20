{// local scope
    // Encapsultaion
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    /*
        inheritance ( 상속 )
    */
    
    // 커피를 만드는 기능만을 보유한 인터페이스
    interface CoffeeMaker{
       makeCoffee(shots: number): CoffeeCup;
    }
    
    class CoffeeMachine implements CoffeeMaker { // 'CoffeeMachine 클래스는 CoffeeMaker라는 인터페이스를 구현하는 클래스 입니다' 라는 의미
        private static BEANS_GRAM_PER_SHOT: number = 7; // class level
        private coffeeBeans: number = 0; // instance (object) level

        // 생성자가 private 이면 상속불가 -> protected(상속 받은 놈들은 수정가능) or public 사용
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
            if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT){ // 커피콩 부족
                throw new Error('Not enough coffee beans!');
            }
            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT; // 갈고있는 커피콩만큼 제거
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
        /*
            만약 자식클래스에서 생성자를 따로 구현하고 싶은 경우엔
            부모의 생성자도 호출해줘야함. 생성자는 따로 함수가 아니기에 그냥 'super(some args)' 만 작성하면됨
        */
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

    //const machine = new CoffeeMachine(23);
    const latteMachine = new CaffeeLatteMachine(23, 'SSSS');
    const coffee = latteMachine.makeCoffee(1);
    console.log(coffee);
    console.log(latteMachine.serialNumber);
}