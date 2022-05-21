# Wallet App

## Create a new app

- ```bash
  expo init rn-wallet
  cd rn-wallet
  ```

- test, `expo start`

  - return error

## Troubleshooting the Error

- Error:

  - Failed building JavaScript bundle.
    App.tsx: [BABEL] D:\study_program\rn-wallet\App.tsx: You gave us a visitor for the node type TSInstantiationExpression but it's not a valid type

- `expo start` returned warning

  - WARNING: expo-cli has not yet been tested against Node.js v16.13.2.
    If you encounter any issues, please report them to https://github.com/expo/expo-cli/issues

- Checked expo version, `expo --version`

  - returned 4.4.3

- Reinstall expo-cli to the latest version

  - `npm install -g expo-cli`

  - `expo --version` returned 5.4.6
