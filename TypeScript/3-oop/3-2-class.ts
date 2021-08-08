{// local scope
    // OOP - 객체지향형 프로그래밍
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    /**
     * - class를 선언할 때 생성자 또는 내부 메소드로 인해서 값이 변하지 않는 것
     * - 즉 인스턴스를 생성할 때마다 새로 만들어줄 필요가 없는 변수들은 static 으로 선언을 하면 메모리 소모를 줄일 수 있음
     * - 새로운 인스턴스를 생성할 때마다 해당 변수를 초기화 하지않고 클래스 자체에 있는 것을 사용하기에 static 변수를 생성하는데 메모리를 소모하지 않음
     * - 이러한 것들은 class level 내에 있다고 함. 즉, 이 변수들은 인스턴스에 있는게 아닌 클래스 자체에 있기에
     * this. 로 접근할 수 없고, className. 자체를 불러서 해당 변수에 접근해야함 
     */
    class CoffeeMaker {
        static BEANS_GRAM_PER_SHOT: number = 7; // class level
        coffeeBeans: number = 0; // instance (object) level

        constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans;

        }
        
        // - 생성자와 비슷한 역할을 하는 makeMachine()에는 클래스 내부의 어떠한 변수도 사용하지 않기에
        // static으로 선언 가능
        // 생성자와의 차이점은 class level에서 바로사용가능 -> 밑의 maker2 확인!
        // ex) Math.abs(); 뭐 이런것들
        static makeMachine(coffeeBeans: number): CoffeeMaker{
            return new CoffeeMaker(coffeeBeans);
        }

        makeCoffee(shots: number): CoffeeCup {
            if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
                throw new Error("Not enough coffee breans!");
            };
            this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT; // 사용한 만큼 커피(gram)을 줄여줌
            return {
                //shots: shots, 키와 이름이 동일하다면 하나만 써줘도 됨
                shots,
                hasMilk: false
            };
        }
    }

    const maker = new CoffeeMaker(32);
    console.log(maker);
    const maker2 = CoffeeMaker.makeMachine(24);
}