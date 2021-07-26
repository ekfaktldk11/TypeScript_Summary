{
    /**
     * JavaScript
     * Primitive Type(원시 타입): number, string, boolean, bigint, symbol, null, undefined
     * Object: function, array...
     */

    // number
    const num: number = 1 // -1, 0.1 숫자는 다 가능

    // string
    const str: string = 'hello';

    //boolean
    const boal: boolean = false;

    // undefined - 값이 있는 지 없는 지 결정이 아직 되지 않은 ~
    let name: undefined; // bad - 단독적으로 undefined 사용 x
    let age: number | undefined; // 숫자 또는 undefined로 할당가능
    age = undefined;
    age = 1;

    // null - 값이 없음.. 텅텅 빔
    let person: null; // bad - 단독적으로 null 사용 x
    let person2: string | null;

    // 보편적으로 데이터 타입이 있거나 결정되지 않았거나 undefined 를 주로사용
    // 값이 있거나 없거나 일때 null을 사용할 때도 있음!

    function find(): number | undefined{
        return undefined
    }

    // unknown - 알수 없는 not sure - 잘 안쓰지만 return type을 알 수 없는 경우 사용
    let notSure: unknown = 0;
    notSure = 'he';
    notSure = true;

    // any
    let anything: any = 0;
    anything = 'hello';

    // unknown, any 웬만하면 둘다 안쓰는 것이 좋음 

    // void
    function print(): void { // void는 딱히 선언 안해줘도됨
        console.log('hello');
        return;
    }

    // never - 절대 return 할 수 없음
    function throwError(message: string): never {
        // message -> server (log) 의 상황에서
        throw new Error(message); // 에러를 던질 때
        // 또는 루프를 사용해서 리턴할 수 없도록 할 경우
    }

    //object - 원시타입(primitive type)을 제외하고 모두 리턴가능
    let obj: object;
    function acceptSomeObject(obj: object) {}
    acceptSomeObject({ name: 'jindorry'});  
    // 배열도 할당이 가능 ...
    // 이렇게 여러 타입을 담을 수 있는 것들은 사용하지 않는 것이 좋음!
}