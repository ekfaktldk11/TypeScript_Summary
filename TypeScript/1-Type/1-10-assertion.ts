{
    /**
     * Type Assertions / 타입을 강요하는 경우에 사용하는데 -> 그다지 사용하지 않는게 좋음!
     * 불가피한 경우만 사용
     */

    // 불가피한 경우 JS ex)   
    function jsStrFunc(): any{
        return 'hello';
    }
    const result = jsStrFunc();
    // JS code에선 jsStrFunc()이 반환하는 값이 string이여도 result라는 변수가 string 타입이라는 것을 확신하지 않기에
    // result.length 라는 string 타입의 api를 사용할 수 없음 -> 이 때 사용하는게 캐스팅
    // (result as string) : 문자열 캐스팅 -> 나는 이 result라는 변수의 타입이 문자열이라는 것을 알고있어!
    console.log((result as string).length); // 5
    // 근데 만약 코드를 수정하여 return 의 값을 return 5; 라고 한다면 위 코드가 undefined를 return함

    // JS에서 캐스팅이 있다면 TS에선 type assertion이 있음
    console.log((<string>result).length); // 5
    // 딱봐도 썩 좋지 않아 보임
    

    // 예시하나더

    function jsStrFunc2(): any{
        return 2;
    }
    const wrong = jsStrFunc2();
    console.log((wrong as Array<number>).push(1)); // error 발생후 App 종료 (Type Error) -> 리턴값이 배열이 아닌 int기에

    function findNumbers(): number[] | undefined{
        return undefined;
    }

    const numbers = findNumbers();
    //numbers.push(2); // undefined 값이 될수도 있는데 push()를 사용하는건 좋지않음
    numbers!.push(2); // !를 사용하면 무조건 null이 아니야. 라고 장담하는 것임-> 즉 뒤에 push()함수를 사용했으니 number변수는 무조건 배열이야
    // 다른 예시는 없어. 라고 진짜진짜 확신할 경우 사용함

    // 우리는 저런거 안써 ~ 라고 생각할 수 있지만 예시를 보자
    const button = document.querySelector('class');
    // querySelector는 요소를 찾으면 요소를 리턴할수도있고 존재하지않으면 null을 리턴
    if(button){ // button이 null 아닐경우 -> 즉 'class'에 해당하는 노드가 있을 경우
        button.nodeValue;
    }
}