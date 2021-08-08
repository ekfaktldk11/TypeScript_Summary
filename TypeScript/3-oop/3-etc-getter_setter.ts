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