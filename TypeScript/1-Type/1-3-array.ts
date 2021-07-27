{
    // Array - 두 가지 방식
    const fruits: string[] = ['tomato','banana'];
    const scroes: Array<number> = [1, 3, 4];
    function printArray(fruits: readonly string[]){
        //fruits.push() -> readonly 때문에 오류남
        // readonly를 사용하기 위해선 :string[] 로 하는게 좋음
        // Array<number> 얘는 readonly 불가
    }
    
    // Tuple - 배열과 다르게 서로다른 타입을 담을 수 있음
    let student: [string, number]; // 이렇게 고정된 사이즈의 서로 다른 타입이 있을 때 사용하기 좋음
    student= ['name', 123]
    student[0] // 'name'
    student[1] // 123
    // 튜플은 잘 사용하지 않는 것을 추천. 이렇게 요소번호로 접근하는 방식이 가독성이 안좋음
    // interface, type alias, class 이 세가지 중 하나로 대체해서 사용하는게 좋음
    const [name, age] = student; // 차라리 이게 좋음 - react 의 useState() 와 비슷한 형태!
    
}