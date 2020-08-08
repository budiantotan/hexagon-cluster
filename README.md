## Tech stack

- Bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- Customized next.js server with express
- Mongodb
- React
- Server: Heroku (not limited)

## Local environment setup

NOTE: Mongodb is required to run this application, make sure mongod is running before starting the application.

Installation guide: https://docs.mongodb.com/manual/administration/install-community/

```bash
# Copy environment variable
cp .env-template .env.local

# Install deps
yarn

# Start server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy to heroku

Before deploying, install heroku CLI, guide: https://devcenter.heroku.com/articles/heroku-cli

```bash
# Login
heroku login

# One time only, create a heroku dyno
heroku create

# One time only, adding mongodb addon to heroku
heroku addons:create mongolab:sandbox

# Deploy
git push heroku master
```
