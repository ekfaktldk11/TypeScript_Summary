// --------------[ES6]-------------

/* 
1. shorthand property names
- 객체의 key 와 value의 이름이 같으면 'key : value' 보단
- 'key' 만 적음
*/
{
    const name = 'herrit';
    const age = '26';

    const herrit_1 = {
        name: name,
        age: age
    };

    const herrit_2 = {
        name,
        age
    };

    console.log(herrit_1)
    console.log(herrit_2)
}

/* 
2. Destructuring Assignment
- RN에서 { title, onSelect } = props 했던 것과 같은 맥락
*/
{
    const student = {
        grade : 2
    }

    // const grade = student.grade

    const { grade } = student;
    
    const { grade: studentGrade } = student;

    console.log(grade, studentGrade);
}

{
    const phoneNum = ['010', '3138', '9928'];

    const [head, middle, tail] = phoneNum;
    // head : '010' , middle : '3138' , tail : '9928'
}

/* 
3. Spread Syntax
*/

{
    const student1 = { name:'kiki'};
    const student2 = { name:'pipi'};
    const studentList = [student1, student2];

    // array copy
    const listCopy1 = [...studentList]; // ary.map() 이나 ary.foreach() 사용하는 것보다 좋음!
    const listCopy2 = [...studentList, {name:'titi'}];
    /*
    주의 할점 : 
    - spread operation은 가져오는 배열의 value를 가져오는 것이 아니라
    배열의 요소들의 주소를 참조하고 있기 때문에, 원래 배열의 값을 변경하면
    복사한 배열들의 값 또한 함께 변경됨
    */

    // array concatenation
    //ary = [ ...ary1, ...ary2]

    // object merge
    const dog1 = { dog1: 'martiz'};
    const dog2 = { dog2: 'poodle'};
    const dog = { ...dog1, ...dog2};
    /*
    주의 할점 : 
    - object를 spread oper 를 사용하여 merge할 때
    merge하는 obj들의 key값이 동일한 것들은 제일 나중에 오는 obj의 value로 덮어씌워지게됨
    - 예를 들어 두개의 obj을 merge 했을 때 key 값이 동일한 것은 duplicate 되지않고 제일 마지막에 들어온
    놈의 value값의 주소를 참조함
    */
}

/* 
4. default parameters
python에서 함수 인자들 선언할 때 default value들 넣는 방식과 똑같음
const f(id='0');{
    console.log(id)
}
*/

/* 
4. ternary operator
const alive = true;
const name = alive ? 'kiki' : 'dead' ;
*/

/* 
5. template literals
-> `${}`
*/

// --------------[ES11]-------------

/* 
1. Optional chaining
*/

{
    const person1 = {
        name : 'kiki',
        job : {
            title: 'teacher',
            class:{
                name : 'gupi'
            }
        }
    }

    const person2 = {
        name : 'titi'
    }

    //case 0 : normal function call
    function printClass(person) {
        console.log(person.job.class.name);
    }
    printClass(person1); // no error
    printClass(person2); // Error!
    //case 0 is bad

    //case 1 : use ternary oper
    function printClass(person) {
        console.log(person.job
            ? person.job.class
                ? person.job.class.name
                : undefined
            : undefined);
    };
    printClass(person1); // no error
    printClass(person2); // no error
    // case 1 is not bad

    // case 2 : And(&&) oper
    function printClass(person) {
        console.log(person.job && person.job.class && person.job.class.name);
    };
    printClass(person1); // no error
    printClass(person2); // no error
    // case 2 is better

    // case 3 : Optional chaining (new arrival!)
    function printClass(person) {
        console.log(person.job?.class?.name);
    };
    printClass(person1); // no error
    printClass(person2); // no error
    // case 3 is the best
}

/* 
2. Nullish coalescing operator -> ??
- falsy value : false, '', 0, null, undefined
- || 연산자는 값이 true 또는 false 에 따라 행동을 다르게 하지만
- ?? 연산자는 값이 있다 없다에 따라 행동을 다르게함
- '' 또는 0 은 값이 있는 것임
*/

// Logical OR oper
{
    const name = 'herrit';
    const userName = name || 'guest';
    console.log(userName); // name 의 값이 false가 아니면 name의 값이 출력되고, false 면 'guest'를 출력
}

{
    const name = null;
    const userName = name || 'guest';
    console.log(userName); // 'guest'
}

{
    const name = '';
    const userName = name || 'undefined';
    console.log(userName); // 'undefined'
}

{
    const name = '';
    const userName = name ?? 'undefined';
    console.log(userName); // ''
}
