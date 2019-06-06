# SMS Router

*Written by JP Sheehan. Licensed under the GPLv3.*

A proxy for SMS messages for the [SMS Proxy Android](https://github.com/jpsheehan/sms-proxy-android) and the [SMS Router Portal](https://github.com/jpsheehan/sms-router-portal) projects.

This is one project of three and is a proof of concept to allow programs to send and receive SMS messages via HTTP on a computer. This project is the HTTP server that acts as the middleman between the Android apps and the clients that want to send and receive SMS messages.

## Downloading and installing dependencies

Before running or building, you must install the project dependencies with the following command:

```bash
git clone https://github.com/jpsheehan/sms-router.git
cd sms-router
npm install
```

## Running

Run the following command to start a development server.

```bash
npm run start
```

## Building

Run the following to build the project.

```bash
npm run build
```

