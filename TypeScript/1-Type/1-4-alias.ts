{
    /**
     * Type Aliases
     */
    type Text = string;
    const name: string = 'jindorry';
    const name2: Text = 'jindorry';
    type Num = number;
    type Student = {
        name: string;
        age: number;
    };
    const student: Student = {
        name: 'jindorry',
        age: 12
    };

    /**
     * String Literal Types
     */
    type Name = 'name';
    let jindorryName: Name;
    jindorryName = 'name'; // 'name' 말고 다른 문자열, 값을 넣으면 오류 뜸
    type JSON = 'json';
    const json: JSON = 'json';

    type Boal = true;
    const isCat: Boal = true;
    // const isDog: Boal = false; -> true만 가능.
}