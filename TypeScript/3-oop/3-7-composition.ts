{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean; // optional - hasSome 이 있을 수 도 있고 없을 수 도 있고 ~
    hasSugar?: boolean;
  };

  /*
		  composition (구성)
		  - Favor Composition over inheritance : 상속 대신에 compostion을 더 선호해라 ~ 라는 말
		  - 필요한것을 조립해 나가는 것
		  - 각각의 기능별로 클래스를 따로 만들어서 필요한것을 가져다가 쓰는 방식
		  - 코드의 재사용성을 극대화 시켜줌!
		  - 하지만 클래스간의 커플링이 심함. -> so what ? -> see 3-8
	  */

  /*
		  상속의 문제점
		  - 상속의 깊이가 깊어질 수 록 서로간의 관계가 복잡해짐
		  - 상속이란 하나의 수직적으로 관계가 형성되는 것을 말함
		  - 내가 어떤 부모 클래스의 행동을 수정하게 되면 이 수정된 사항 때문에
		  이 것을 상속하는 모든 자식 클래스에 영향을 미칠수 있는 치명적인 단점! 이 있음
		  - 제일 큰 문제점은 타입스크립트에서는 하나를 넘는 부모를 상속받을 수 없음
		  class SweetCaffeLatteMachine extends SweetCoffeeMaker, CaffeLatteMachine {} <- 이렇게는 못 만듬
		  - 이런 문제들을 해결해 주는 것이 composition
	  */

  // 커피를 만드는 기능만을 보유한 인터페이스
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    // 'CoffeeMachine 클래스는 CoffeeMaker라는 인터페이스를 구현하는 클래스 입니다' 라는 의미
    private static BEANS_GRAM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
    }

    clean() {
      console.log('cleaning the machine...');
    }

    private gridBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    private preheat(): void {
      console.log('heating up... ');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...`); // 커피내리는중
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.gridBeans(shots); // 커피를 갈아야함
      this.preheat(); // 커피기계를 따듯하게 데움
      return this.extract(shots); // 커피물을 내려서 추출
    }
  }

  // 싸구려 우유 거품기 - for compostion
  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log('Steaming some milk... ');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  // 설탕 제조기 - for compostion
  class AutomaticSugarMixer {
    private getSuger() {
      console.log('Getting some sugar from candy');
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSuger();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class CaffeeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: CheapMilkSteamer
    ) {
      super(beans);
    }
    // CaffeeLatteMachine 에서만 사용될 steamMilk()
    private steamMilk(): void {
      console.log('Steaming some milk...');
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots); // 부모의 makeCoffee() 의 가열하고 그라인딩하는 작업을 다 하도록 함
      this.steamMilk(); // 그리고 우유만 부음
      return this.milkFrother.makeMilk(coffee);
    }
  }
  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(private beans: number, private sugar: AutomaticSugarMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  // 그럼 달달한 카페라테를 만들고 싶으면 ..? 여기서 또 추가하여 흑설탕을 추가하고 싶다면? -> composition 으로 해결
  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private milk: CheapMilkSteamer,
      private sugar: AutomaticSugarMixer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milk.makeMilk(this.sugar.addSugar(coffee));
    }
  }
}
