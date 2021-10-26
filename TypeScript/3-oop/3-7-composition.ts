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
      - 복잡한 상속의 수직구조를 피할 수 있고, 상속의 레벨을 한단계로만 유지하면서
      필요한 코드를 재사용할 수 있음! 

      But 단점도 존재
      - composition class는 서로간에 너무 타이트하게 커플링이 되어있어서
      컴포지션 클래스가 변경되거나 다른것으로 대체하고 싶어도 서로 연결되어있어서
      이 컴-클을 사용하는 모든 클래스를 다 바꿔줘야함
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

    constructor(
      coffeeBeans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
      this.coffeeBeans = coffeeBeans;
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
      this.gridBeans(shots);
      this.preheat();
      const coffee = this.extract(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }
  // class CoffeeMachine implements CoffeeMaker {
    //   // 'CoffeeMachine 클래스는 CoffeeMaker라는 인터페이스를 구현하는 클래스 입니다' 라는 의미
    //   private static BEANS_GRAM_PER_SHOT: number = 7; // class level
    //   private coffeeBeans: number = 0; // instance (object) level

    //   constructor(coffeeBeans: number) {
    //     this.coffeeBeans = coffeeBeans;
    //   }

    //   static makeMachine(coffeeBeans: number): CoffeeMachine {
    //     return new CoffeeMachine(coffeeBeans);
    //   }

    //   fillCoffeeBeans(beans: number) {
    //     if (beans < 0) {
    //       throw new Error('value for beans should be greater than 0');
    //     }
    //     this.coffeeBeans += beans;
    //   }

    //   clean() {
    //     console.log('cleaning the machine...');
    //   }

    //   private gridBeans(shots: number) {
    //     console.log(`grinding beans for ${shots}`);
    //     if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
    //       throw new Error('Not enough coffee beans!');
    //     }
    //     this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    //   }

    //   private preheat(): void {
    //     console.log('heating up... ');
    //   }

    //   private extract(shots: number): CoffeeCup {
    //     console.log(`Pulling ${shots} shots...`); // 커피내리는중
    //     return {
    //       shots,
    //       hasMilk: false,
    //     };
    //   }

  // 싸구려 우유 거품기 - for compostion
  // class CheapMilkSteamer {
  //   private steamMilk(): void {
  //     console.log('Steaming some milk... ');
  //   }
  //   makeMilk(cup: CoffeeCup): CoffeeCup {
  //     this.steamMilk();
  //     return {
  //       ...cup,
  //       hasMilk: true,
  //     };
  //   }
  // }
  // 설탕 제조기 - for compostion
  // class CandySugarMixer {
  //   private getSuger() {
  //     console.log('Getting some sugar from candy');
  //     return true;
  //   }

  //   addSugar(cup: CoffeeCup): CoffeeCup {
  //     const sugar = this.getSuger();
  //     return {
  //       ...cup,
  //       hasSugar: sugar,
  //     };
  //   }
  // }

  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  class CheapMilkSteamer implements MilkFrother {
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

  class FancyMilkSteamer implements MilkFrother {
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

  class ColdMilkSteamer implements MilkFrother {
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

  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup; // 우유를 넣지 않고 리턴
    }
  }

  class CandySugarMixer implements SugarProvider {
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

  class SugarMixer implements SugarProvider {
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

  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup; // 설탕을 넣지 않고 리턴
    }
  }

  // class CaffeeLatteMachine extends CoffeeMachine {
  //   constructor(
  //     beans: number,
  //     public readonly serialNumber: string,
  //     private milkFrother: MilkFrother
  //   ) {
  //     super(beans);
  //   }
  //   // CaffeeLatteMachine 에서만 사용될 steamMilk()
  //   private steamMilk(): void {
  //     console.log('Steaming some milk...');
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots); // 부모의 makeCoffee() 의 가열하고 그라인딩하는 작업을 다 하도록 함
  //     this.steamMilk(); // 그리고 우유만 부음
  //     return this.milkFrother.makeMilk(coffee);
  //   }
  // }
  // class SweetCoffeeMaker extends CoffeeMachine {
  //   constructor(private beans: number, private sugar: SugarProvider) {
  //     super(beans);
  //   }
  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.sugar.addSugar(coffee);
  //   }
  // }

  // // 그럼 달달한 카페라테를 만들고 싶으면 ..? 여기서 또 추가하여 흑설탕을 추가하고 싶다면? -> composition 으로 해결
  // class SweetCaffeLatteMachine extends CoffeeMachine {
  //   constructor(
  //     private beans: number,
  //     private milk: MilkFrother,
  //     private sugar: SugarProvider
  //   ) {
  //     super(beans);
  //   }

  //   makeCoffee(shots: number): CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.milk.makeMilk(this.sugar.addSugar(coffee));
  //   }
  // }

  // 그럼 이 컴포지션 클래스의 문제점을 알아보자 !
  // const CheapMilkMaker = new CheapMilkSteamer();
  // const candySugar = new CandySugarMixer();
  // const sweetMachine = new SweetCoffeeMaker(12, candySugar);
  // const latteMachine = new CaffeeLatteMachine(12, 'SS', CheapMilkMaker);
  // const sweetLatteMachine = new SweetCaffeLatteMachine(
  //   12,
  //   CheapMilkMaker,
  //   candySugar
  // );
  // 위 몇 줄만 봐도 엄청 재사용성이 떨어짐
  /*
    # 여기서 중요한 포인트!!
    [ Decoupling 의 원칙 ]
    - 위 몇 줄의 코드처럼 클래스들간의 상호 작용이 발생하는 경우
    클래스 자신을 노출하는 것이 아니라 계약서를 통해서 의사소통을 해야함
    그럼 그 계약서란 ?? -> 바로 interface !!
    - interface 를 통해 같은 클래스르 재사용하면서
    내가 원하는 부품을 가져와서 서로 다른 객체를 만들 수 있음 !
  */

  // Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();

  //
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);

  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
  const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
  const sweetLatteMachine = new CoffeeMachine(
    12,
    cheapMilkMaker,
    candySugar
  );
  
  /**
   * composition에서 배운내용을 순서대로 정리하면
   * (1) 상속이 depth가 깊어질 수 록 서로 관계가 복잡해 지기에
      composition을 통해 각각의 기능별 클래스를 구현해서 필요한 것을 사용함
   * (2) composition class는 서로간에 너무 타이트하게 커플링이 되어있어서
      컴포지션 클래스가 변경되거나 다른것으로 대체하고 싶어도 서로 연결되어있어서
      이 컴-클을 사용하는 모든 클래스를 다 바꿔줘야함
   * (3) (2)의 컴포지션의 단점을 보완하기 위해 interface 라는 계약서를 구현해서
      디커플링함
   * (4) 의사소통하는 클래스를 줄이고 interface를 통해 같은 클래스를 사용하면서
      내가 원하는 부품을 가져와서 서로 다른 객체를 만듬
   * (5) 결론으로 상속, 컴포지션, 인터페이스의 장단점을 이용하여 적절한 상황에 사용
   */

  /*
    엘리샘의 꿀팁 !
    - Over Engineering 하지마라!
    -> 타이트한 일정내에 어떤 기능들을 구현해야 하는데
    이럴 때 기능을 구현하는 것에 초점을 둬야지 기능을 구현하기도 전에
    어떻게 하면 코드를 개선할 수 있을 까 하는 것에 초점을 두거나
    앞으로 발생할지도 안할지도 모르는 사항에 대비해 초반에
    아주 엑썰런트하게 코드를 복잡하게 구현할 필요가 전혀 없음!
    이것이 개발자의 기본 !
  */
}
