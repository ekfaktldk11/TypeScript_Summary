# 1. ts file to js file
- 웹 프로젝트 작성시 ts 파일로는 사용이 불가하여 js 파일로 바꿔줘야 함
-> tsc main.ts

- ts 파일을 업데이트 하면서 계속 tsc main.ts 하기는 귀찮으니 /*watch-mode*/ 를 사용하여 main.ts 가 업데이트 및 세이브 될때마다 main.js도 같이 업데이트 할 수 있도록 하는 기능
-> tsc main.ts -w