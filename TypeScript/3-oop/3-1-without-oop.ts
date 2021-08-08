{// local scope

    type CoffeeCup = {
        shots: number;
        hasMilk: boolean;
    };

    const BEANS_GRAM_PER_SHOT: number = 7;
    // primitive type에서 숫자를 할당할 경우에는 타입을 따로 적지 않아도 알아서 타입이 할당됨
    // 뭐 타입을 명시해줘도 문제는 없음

    let coffeeBeans: number = 0; // g (gram)

    function makeCoffee(shots: number): CoffeeCup {
        if (coffeeBeans < shots * BEANS_GRAM_PER_SHOT) {
            throw new Error("Not enough coffee breans!");
        };
        coffeeBeans -= shots * BEANS_GRAM_PER_SHOT; // 사용한 만큼 커피(gram)을 줄여줌
        return {
            //shots: shots, 키와 이름이 동일하다면 하나만 써줘도 됨
            shots,
            hasMilk: false
        };
    }

    coffeeBeans += 3 * BEANS_GRAM_PER_SHOT;
    const coffee = makeCoffee(2);
    console.log(coffee);
}