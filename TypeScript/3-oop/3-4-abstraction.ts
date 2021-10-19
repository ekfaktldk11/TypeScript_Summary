{// local scope
    // Encapsultaion
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    /*
        인터페이스 정의
        - '나랑 의사소통 하려면 나는 이런 이런 규약을 가지고있어 나는 이런 행동을 할 수 있어'
        라고 명시해 놓는 계약서(cotractor) 같은 것임
        - 인터페이스를 구현하는 클래스는 인터페이스 안에있는 함수를 모두 구현해야함
        - 인터페이스를 사용하는 이유는 추상화를 극대화 하기위함임
    */
    
    // 커피를 만드는 기능만을 보유한 인터페이스
    interface CoffeeMaker{
       makeCoffee(shots: number): CoffeeCup;
    }
    // 커피 전문샵에서 사용하는 인터페이스를 구현
    interface CommercialCoffeeMaker{
        makeCoffee(shots: number): CoffeeCup;
        fillCoffeeBeans(beans: number): void;
        clean(): void;

    }
    class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker{ // 'CoffeeMachine 클래스는 CoffeeMaker라는 인터페이스를 구현하는 클래스 입니다' 라는 의미
        private static BEANS_GRAM_PER_SHOT: number = 7; // class level
        private coffeeBeans: number = 0; // instance (object) level

        private constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans;

        }
        
        // - 보통 이렇게 static이라는 키워드를 붙여서 무언가 객체를 만들 수 있는 이런 함수를 제공한다면
        // 그말은 누군가가 생성자(constructor)를 이용해서 생성하는것을 금지하기 위해서 임
        // - 이러한 경우엔 생성자를 private로 선언
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

    // const maker = new CoffeeMachine(2); -> 생성자가 private이기 때문에 new를 사용한 방법으론 생성불가
    /*
        abstraction(추상화)는 인터페이스를 간단하고 심플하게 만듬으로써,
        사용하는 사람이 간편하게 많은 생각을 하지않고도 심플하게 사용할 수 있도록 하게 해줌
        - 사용하는 사람이라는(내가 정의한 클래스를 이용하는 사람) 것은 같은 팀원이나 이 코드를 공유하는 사람들
        - preheat, extract, gridBeans 처럼 사용자들에게 건드릴 필요가 없는 함수들을 private 해주어
        정말 필요한 함수만 노출해서 방식을 좀더 간단하고 심플하게 만드는게 추상화
        - 내부의 복잡한 함수들은 고려할 필요없이 인터페이스에 규약된 것만을 사용하면 됨(인터페이스에 사용자가 필요한 것들만 ...)
    */
    // const maker:CoffeeMachine = CoffeeMachine.makeMachine(22);
    // maker.fillCoffeeBeans(32);
    // maker.makeCoffee(2);

    // // const maker2:CoffeeMaker = CoffeeMachine.makeMachine(22);
    // // // maker2 는 maker 1 과 다르게 타입이 CoffeeMachine 이 아sls
    // // // CoffeMachine 클래스의 인터페이스인 CoffeeMaker 라서 CoffeeMaker에 명시된 makeCoffee() 외엔 사용불가
    // // // 이런식으로 인터페이스를 사용해서 추상화를 극대화!
    // // // maker2.fillCoffeeBeans(32);
    // // maker2.makeCoffee(2);

    // const maker2: CommercialCoffeeMaker = CoffeeMachine.makeMachine(22);
    // maker2.makeCoffee(2);
    // maker2.fillCoffeeBeans(32);
    // maker2.clean();

    class AmateurUser {
        constructor(private machine: CoffeeMaker) {}
        makeCoffee(){
            const coffee = this.machine.makeCoffee(2);
            console.log(coffee);
        }
    }

    class ProBarista {
        constructor(private machine: CommercialCoffeeMaker){}
        makeCoffee(){
            const coffee = this.machine.makeCoffee(2);
            console.log(coffee);
            this.machine.fillCoffeeBeans(45);
            this.machine.clean();
        }
    }

    /*
        포인트는 동일한 obj의 인스턴스 일지라도
        이 obj는 두 가지의 인터페이스를 구현하기 때문에
        amateur user, proBarista user 는 이렇게 커피 머신을 받오는 것이 아니라
        커피 메이커를 생성자에서 받아오고 CommercialCoffeeMaker라는 인터페이스를 생성자에서 받아오기 때문에
        이 인터페이스에 규약된 클래스보단 조금 좁은 범위의 인터페이스에 규약된 함수들만 가져올 수 있음
    */
    const maker:CoffeeMachine = CoffeeMachine.makeMachine(22);
    const amateur = new AmateurUser(maker);
    const pro = new ProBarista(maker);
    //amateur.makeCoffee();
    pro.makeCoffee();

}