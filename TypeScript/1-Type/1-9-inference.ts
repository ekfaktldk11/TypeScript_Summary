{
    /**
     * Type Inference - 타입 추론
     * 타입을 명확하게 명시해주지 않고 알아서 매겨지는것
     */
    let text = 'hello';
    //text = 1; // text란 변수는 선언함과 동시에 ts에서 알아서 string type을 매기기에, 이 경우 error가 뜸
    // function print(message) { // 파라미터 message의 타입은 'any'고 명확하게 타입을 명시하라는 권유문이 변수에 커서 올리면 확인 가능
    //     console.log(message);
    // }
    // print('dasd');
    // print(1);
    function print(message = 'hello') { // 파라미터 message의 타입은 'any'고 명확하게 타입을 명시하라는 권유문이 변수에 커서 올리면 확인 가능
        console.log(message);
    }
    print('dasd');
    //print(1); // -> error 파라미터 message의 디폴트 선언으로 인해 string 타입이 알아서 매겨지기 때문에

    function add(x: number, y: number) { // add 라는 함수 선언 위에 커서를 올리면 return에서 사용되는 변수 들의 타입이 넘버기 때문에 알아서 리턴 타입이 넘버다 ! 라고 유추함
        return x + y;
    }

    const result = add(1, 2); // result 또한 타입이 넘버... 알아서 매겨짐

    // 하지만 이렇게 간단하게 하는게 좋은게 아닌거임
    // 원시타입같은 뻔한 것들은 생략하더라도 함수같은것은 파라미터나 리턴타입은 정확하게 명시하는게 좋음
    // 걍왠만하면 타입 써 -> 가독성을 위해!
}