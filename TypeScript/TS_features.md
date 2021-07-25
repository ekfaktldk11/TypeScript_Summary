# What is 'TypeScript'?
- TypeScript(TS) 는 javaScript(JS)의 super-Set(상위 확장)인 open-source-programming 언어
- Client, Server Side를 위한 개발에 사용 가능
- TS는 JS 엔진을 사용하면서 커다란 애플리케이션을 개발할 수 있게 설계된 언어
- JS to TS , TS to JS 로 변환해도 각 프로그램 동작가능
- TS에서 자신이 원하는 Type을 정의하고 프로그래밍을 하면 JS로 컴파일되어 실행 가능
- 모든 (JS가 동작하는) OS, Browser and Host 에서 사용 가능

# JS vs TS 가장 큰 특징
- JS : 동적으로 타입이 (런타임 단계에서)결정되어서 런타임 단계에서 문제를 일으킬 우려가 존재(runtime errors)

- TS : 정적으로 타입을 결정할 수 있기에 컴파일 단계에서 타입에 대한 에러를 확인가능

* 컴파일 단계에서 타입이 결정됨 : statically typed
* 런타임 단계에서 타입이 결정됨 : dynamically typed -> 할당된 값에 따라 타입이 변함

- 타입 동적 할당은 대부분 유연하고 빠르고 쉽다고 생각하지만 꼭 그렇지만은 않음
- 타입 동적 할당은 가독성이 떨어지고 개발자가 테스트 할 때는 문제가 없을 지 몰라도 실제 유저들이 사용할 때 폭발적인 에러가 발생할 우려가 있음

# 더 막강한 OOP - TS
- 프로토타입 기반 OOP 인 JS는 constructor functions 를 이용해 간편하게 클래스를 만들 수 있지만 OOP 기준에선 어려운 편
- ES6에서 class라는 것이 도입되었지만 부족

- TS에서는 위를 보완할 수 있는 class, interface, generics, types를 도입하여 JS 보다 더 강한 OOP로 사용 가능

- OOP -> modern programming paradigm : 현대 시대에서 널리 쓰이고 있는 프로그래밍을 해나가는 것

* OOP의 특징
- Modularity : 객체를 위주로 모듈성있는 프로그래밍 작성 가능
- reusability : 모듈별로 원하는 것을 재사용 가능
- extensible : 객체 단위로 확장해 나갈 수 있음
- maintainability : 위의 것들을 기반으로 유지 보수에 강력함

- 위 네가지 특성들을 잘 따라 나가면 생산성, 높은 퀄리티 그리고 또 빠른 프로그래밍을 할 수 있음

# TypeScript Official Docs Info
TypeScript: https://www.typescriptlang.org