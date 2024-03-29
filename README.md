# Full Translation Service (FTS!)

This is a prototype app that was created to show the capability to assist with live translation. 
This is just to show case the translation service and does not follow proper coding standard as well as secure routing of the endpoints.
It was started as a self coding challenge to see how fast the app can be built.

Project Start Date: June 9, 2023 5:34am.
MVP status was reached at 12:30 pm Sunday 6/11/2023.

## How to run the application
#### prerequisite

This application requires [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) with access to [Amazon Translate](https://docs.aws.amazon.com/translate/latest/dg/what-is.html) service to run the application. For opne AI you can generate the API key using this [Link](https://platform.openai.com/api-keys).

Once the AWS credentials are available you will be able to run the project by using the following instructions:
```
git clone https://github.com/kcabhish/fts.git
```
You will need to create a .env file using [.env.example](https://github.com/kcabhish/fts/blob/main/workspace/translateService/.env.example) file. Please make sure to check the path as the .env file needs to be in workspace\translateService\.env
```
npm i
npm start
```
Once both the services are running you can access the application by going to ```http://localhost:3000```

> **NOTE**
> When running locally on your machine it will use the default aws profile. 
> Alternatively the credentials can also be used and updated in ```workspace\translateService\.env```.
> ```
> AWS_ACCESS_KEY_ID: Enter access key id here
> AWS_SECRET_ACCESS_KEY: Enter secret access key here
> ```

## About this project

This project uses [react](https://react.dev/) for the front end and [expres](https://expressjs.com/)s framework to link with [Amazon Translate](https://docs.aws.amazon.com/translate/latest/dg/what-is.html).
####Screen shot
![ftsTranslate](https://github.com/kcabhish/fts/assets/6719125/77b930d8-ccce-491a-a97a-b2d7f9a490e1)

#### Screen shot with Open AI

Translation on contents for open AI is intentianally skipped to avoid token consumption in the demo app.
![fts](https://github.com/kcabhish/fts/assets/6719125/513e9504-a734-438f-8e3d-5f474331fa26)
