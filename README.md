# 360Capture App
App to connect RICOH THETA V and similar cameras with API level 2.1 from RICOH and manage images. 
You can take a picture with the app remotly, download the picture to the phone/tablet (Android and iOS) or delete images from device internal memory.

## Ionic, Capacitor & Angular
- Capacitor version: 3.3.2
- Ionic version: 6.18.1
- Angular version: 12.1.4

## Node & NPM
- Node version: 16.13.1
- NPM version: 8.3.1

## Cordova libraries used
- cordova-clipboard
- cordova-open-native-settings
- cordova-plugin-advanced-http
- cordova-plugin-file
- cordova-plugin-wifiwizard2

## First steps to run the project
- Run `npm install`. If you have an EACCESS error, you have the guide on how to solve it below
- Run `ionic build`

## Important commands
- Run `ionic serve` within the app directory to see your app in the browser
- Run `ionic capacitor add` to add a native iOS or Android project using Capacitor
- Generate your app icon and splash screens using `cordova-res --skip-config --copy`
- Explore the Ionic docs for components, tutorials, and more: [Docs](https://ion.link/docs)
- Run `ionic cap run android` || `ionic cap run ios` (Add `--prod` for production)

## Fix errors with EACCESS
1. Install nvm `$ sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
2. Close the current terminal and open a new one
3. Run `$ command -v nvm`. If something prints, the installation was successful.
4. `$ nvm install --lts`
5. Set the newly installed NodeJS as the default environment: `$ nvm alias default lts/*`
6. `$ which npm` will print a path somewhere within the ~/.nvm folder. Global packages will now be installed in the ~/.nvm directory, so permission errors should no longer occur as long as npm is used without sudo