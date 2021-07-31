{
    /**
     * Enum -> 여러가지의 관련된 상수값들을 한군데에 모아서 정의하는 타입
     */
    // JS에는 enum type이 존재하지 않기에 TS 에서 자체적으로 제공하는 Type
    
    // JavaScript
    const MAX_NUM = 6;
    const MAX_STUDENTS_PER_CLASS = 10;
    const MONDAY = 0;
    const TUESDAY = 1;
    const WEDNESDAY = 2;
    const DAYS_ENUM = Object.freeze({"MONDAY": 0, "TUESDAY":21, "WEDNESDAY": 2}) // obj를 수정할 수 없도록 꽁꽁 얼리는 api
    const dayOfToday = DAYS_ENUM.MONDAY;

    // TypeScript
    enum Days { // enum을 사용할 때는 보통 첫글자에만 대문자를 사용
        Monday, // 0
        Tuesday, // 1
        Wednesday, // 2
        Thursday, // 3
        Friday, //4
        Saturday, // 5
        Sunday, // 6
    }
    // enum은 알아서 번호를 매김. 1부터 시작하고 싶으면 Monday = 1 로, 첫번째 만 명시해주면 됨
    
    console.log(Days.Tuesday); // 1
    let day = Days.Saturday;
    console.log(day); // 4

    day = 1; // -> type error 가 안뜸 ... 이러면 타입 스크립트 쓰는 이유가 없음
    // 따라서 TypeScript에선 enum 잘 안쓰는 것이 좋음!
    // enum 대신 union을 사용하는 게 좋음
    type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday';

    let dayOfweek : DaysOfWeek = 'Monday';
    // dayOfweek = 1; -> Type error 발생 -> type DaysOfWeek에 명시된 value들을 제외하고는 할당 불가함 
    dayOfweek = 'Wednesday';
    
}