# SmartBot

Mensa ChatBot with Angular 7 & DialogFlow [demo](http://mensachatbot.pavanct.com)

<p align="center">
  <img src="screenshot.gif" width="70%"/>
</p>

## Install dependencies

```
npm install
```

## Run locally

```
npm start
```

### Deployment Instructions
1. Generate Static files - firs time

```
npm run build
```

2. Install Docker

  https://docs.docker.com/install/

3. Build docker image

```
sudo docker build -t "image-name" .
```

4. Run docker image
```
sudo docker run -d -p 80:80 --name "conatiner-name" image-name
```
