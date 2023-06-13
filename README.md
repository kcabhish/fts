# Full Translation Service (FTS!)

This is a prototype app that was created to show the capability to assist with live translation. 
This is just to show case the translation service and does not follow proper coding standard as well as secure routing of the endpoints.
It was started as a self coding challenge to see how fast the app can be built.

Project Start Date: June 9, 2023 5:34am.
MVP status was reached at 12:30 pm Sunday 6/11/2023.

## How to run the application
#### prerequisite
The application requires [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) with access to [Amazon Translate](https://docs.aws.amazon.com/translate/latest/dg/what-is.html) service to run the application. 

Once the AWS credentials are available you will be able to run the project by using the following instructions:
```
git clone https://github.com/kcabhish/fts.git
npm i
npm start
// open another terminal and navigate to workspace/translateService
npm start // this will start a express server
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
Screen shot
![ftsTranslate](https://github.com/kcabhish/fts/assets/6719125/77b930d8-ccce-491a-a97a-b2d7f9a490e1)
