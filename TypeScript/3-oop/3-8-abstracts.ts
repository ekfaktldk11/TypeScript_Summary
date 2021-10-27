{// local scope
    // Encapsultaion
    type CoffeeCup = {
      shots: number;
      hasMilk?: boolean; // optional - hasSome 이 있을 수 도 있고 없을 수 도 있고 ~
      hasSugar?: boolean;
  };

  /*
    abstracts (abstract class))
    - 어떤 특정한 기능만 자식클래스에서 달라진다면 
    abstract class를 통해 구현
    - 예를 들어 부모클래스 하나의 기능을 자식클래스에서 super()를 통해
    부모 기능을 사용하고 일부는 변경할 때, super()를 사용하지 않고
    abstract class를 통해 구현하여 더 깔끔한 코드 작성 가능
    - abstract class는 그 클래스로 인스턴스를 찍어낼 수 없음
    - abstract class 에서 자식 클래스에서 달라지는 기능들만 protected abstract func() 형태fh
    구현하면 상속되는 자식클래스에서 abstract class를 제외하고는 다 복제됨 (super() 사용할 필요가 전혀 없음)
    - 대신 abstract func() 은 꼭 자식 클래스에서 세부 절차 코드를 작성해야 함
    - 물론 생성자에는 super() 써줘야 함
  */
  
  interface CoffeeMaker{
     makeCoffee(shots: number): CoffeeCup;
  }
  
  // abstract class
  abstract class CoffeeMachine implements CoffeeMaker { // 'CoffeeMachine 클래스는 CoffeeMaker라는 인터페이스를 구현하는 클래스 입니다' 라는 의미
      private static BEANS_GRAM_PER_SHOT: number = 7; // class level
      private coffeeBeans: number = 0; // instance (object) level

      constructor(coffeeBeans: number) {
          this.coffeeBeans = coffeeBeans;

      }

      fillCoffeeBeans(beans: number) {
          if(beans < 0) {
              throw new Error('value for beans should be greater than 0');
          }
          this.coffeeBeans += beans;
      }

      clean() {
          console.log('cleaning the machine...');
      }

      private gridBeans(shots : number){
          console.log(`grinding beans for ${shots}`);
          if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT){
              throw new Error('Not enough coffee beans!');
          }
          this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
      }

      private preheat(): void{
          console.log('heating up... ');
      }
      /*
        - 상속받는 자식 클래스에서 변경될 여지가 있는 함수는
        abstract 클래스로 만들어 줌
        - abstract 클래스는 선언만 할 뿐 안의 절차는 비워둠 (필수)
        -> 자식 클래스에서 알아서 따로 구현
      */ 
      protected abstract extract(shots: number): CoffeeCup;
      
      makeCoffee(shots: number): CoffeeCup {
          this.gridBeans(shots); // 커피를 갈아야함
          this.preheat(); // 커피기계를 따듯하게 데움
          return this.extract(shots); // 커피물을 내려서 추출
      }
  }

  class CaffeeLatteMachine extends CoffeeMachine{
      constructor(beans: number, public readonly serialNumber: string){ // readonly : 한번 설정하면 바뀌지 않는 값들 앞에 붙여줌
          super(beans);
      }
      // CaffeeLatteMachine 에서만 사용될 steamMilk()
      private steamMilk(): void {
          console.log('Steaming some milk...');
      }

      protected extract(shots: number): CoffeeCup {
        this.steamMilk();
        return {
          shots,
          hasMilk: true
        }
      }
  }
  class SweetCoffeeMaker extends CoffeeMachine {
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true
      }
    }
  }

  // 위 주석의 특성을 이용하여 CoffeeMaker[] 타입으로 생성가능
  const machines: CoffeeMaker[] = [
      new CaffeeLatteMachine(16, '1'),
      new SweetCoffeeMaker(16),
      new CaffeeLatteMachine(16, '1'),
      new SweetCoffeeMaker(16)
  ]
}