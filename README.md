# IBank

Bank application created with React Native, NestJs and MongoDB

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project created for improve my skills and test what can I do
	
## Technologies
React Native project is created with:
* @apollo/client: ^3.7.0
* @react-navigation/bottom-tabs: ^6.3.3
* @react-navigation/stack: ^6.2.2
* graphql: ^16.6.0
* moment: ^2.29.4
* native-base: ^3.4.12
* react: 18.0.0
* react-native: 0.69.4
* react-native-svg: ^12.4.4
* styled-components: ^5.3.5
* etc

Nest project is created with:
* @nestjs/apollo: ^10.0.19
* @nestjs/common: ^9.0.0
* @nestjs/config: ^2.2.0
* @nestjs/core: ^9.0.0
* @nestjs/graphql: ^10.0.21
* @nestjs/jwt: ^9.0.0
* @nestjs/mongoose: ^9.2.0
* @nestjs/passport: ^9.0.0
* moment: ^2.29.4
* apollo-server-core: ^3.10.1
* apollo-server-express: ^3.10.1
* etc
	
## Setup
To run react native project, install it locally using yarn:

```
$ cd ./mobile/IBank
$ yarn install
$ cd ./ios
$ pod install
$ cd ..
$ yarn start
```

To run nest project, install it locally using npm:

```
$ cd ./server/ibank
$ npm install
$ npm run dev
```
