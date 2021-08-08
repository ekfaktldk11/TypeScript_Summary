{// local scope
    // Encapsultaion
    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    /**
     * - 정보 은닉
     * public / private /
     * protected : 외부에서는 접근 할수 없지만 클래스를 상속한 자식 클래스에서만 접근할 수 있음
     * -> 그니까 해당 클래스를 상속받은 자식 클래스들은 이 속성값을 변경해 줄순있음 (부모와의 특징이 조금 다르지만 외부에서의 접근은 허용하지 않을 경우)
     */
    class CoffeeMaker {
        private static BEANS_GRAM_PER_SHOT: number = 7; // class level
        private coffeeBeans: number = 0; // instance (object) level

        private constructor(coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans;

        }
        
        // - 보통 이렇게 static이라는 키워드를 붙여서 무언가 객체를 만들 수 있는 이런 함수를 제공한다면
        // 그말은 누군가가 생성자(constructor)를 이용해서 생성하는것을 금지하기 위해서 임
        // - 이러한 경우엔 생성자를 private로 선언
        static makeMachine(coffeeBeans: number): CoffeeMaker{
            return new CoffeeMaker(coffeeBeans);
        }

        fillCoffeeBeans(beans: number) {
            if(beans < 0) {
                throw new Error('value for beans should be greater than 0');
            }
            this.coffeeBeans += beans;
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

    // const maker = new CoffeeMaker(2); -> 생성자가 private이기 때문에 new를 사용한 방법으론 생성불가
    const maker = CoffeeMaker.makeMachine(22);

    class User {
        firstName: string;
        lastName: string;
        fullName: string;

        constructor(firstName: string, lastName: string){
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = `${firstName} ${lastName}`;
        }
    }
    const user = new User('Steve', 'Jobs');
    console.log(user.fullName); // Steve Jobs
    user.firstName = 'Ellie';
    console.log(user.firstName); // Ellie
    console.log(user.fullName); // Steve Jobs -> 생성자에서 정의된 fullName으로 출력되기 때문에

}