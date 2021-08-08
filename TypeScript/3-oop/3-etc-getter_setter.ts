{
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

{
    class User {
        get fullName(): string{
            return `${this.firstName} ${this.lastName}`
        }
        private internalAge = 4;
        get age(): number{
            return this.internalAge;
        }
        set age(num: number){ // getter, setter 함수이름은 같아도 parameter가 다르기에 다른함수로 인식가능 / 이건 모든 함수선언에서도 마찬가지
            // if문 으로 유효성 검사
            this.internalAge = num;
        }

        // - 생성자를 통해 초기화 시키려는 변수들의 경우엔 따로 변수들을 선언할 필요없이
        // 밑에 처럼 만들어주면 됨
        // - 위의 다른 local scope에 있는 User의 생성자 code와 같은 동작을 함
        constructor(private firstName: string, private lastName: string){}
    }
    const user = new User('Steve', 'Jobs');
    user.age = 6;
    console.log(user.age);
}