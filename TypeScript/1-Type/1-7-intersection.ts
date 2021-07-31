{
    /**
     * Intersection Types: & 느낌
     */

    type Student = {
        name: string;
        score: number;
    }

    type Worker = {
        employeeId: number;
        work: () => void;
    }

    function internWork(person: Student & Worker){ // Intersection Type
        console.log(person.name, person.employeeId, person.work());
    }

    internWork({
        name: 'jindorry',
        score: 1,
        employeeId: 123,
        work: () => {}
    })
}