# Cantinho Verde

A legacy React Native mobile application for small-business sales, inventory and cash-flow management. The app uses Firebase Realtime Database to read and update operational data.

> **Project status:** This is a historical prototype, last updated in April 2020. Its original React Native and React versions are obsolete. The repository is preserved as an example of an end-to-end mobile application, not as a production-ready system.

## What the app covers

The app is organised around day-to-day shop operations:

- **Sales:** record sales using half-kilogram and one-kilogram quantities, calculate the sale value from configured prices and update inventory.
- **Inventory:** view current stock and register stock replenishment.
- **Cash flow:** view cash received, cash paid out, current balance and amounts still receivable.
- **Pending sales:** list unpaid sales and update the cash-flow totals when a payment is settled.
- **Sales history:** browse previously recorded sales.
- **Expenses:** register cash outflows with a description and amount.

The interface and business labels are in Portuguese.

## Technology

| Area | Technologies |
| --- | --- |
| Mobile application | React Native 0.55.0 |
| UI | React 16.3.0 alpha, NativeBase 2.x |
| Navigation | React Navigation 2.x |
| Data layer | Firebase Realtime Database (Firebase JS SDK 5.x) |
| Tests | Jest is declared in the project configuration; no test files are currently included |

The repository contains Android and iOS project folders. The current source and dependencies have not been validated with modern mobile build toolchains.

## Structure

```text
src/
  App.js
  screens/
    entradaCaixa.js
    saidaCaixa.js
    novaVenda.js
    estoque.js
    fluxoCaixa.js
    historicoVenda.js
    vendasPendentes.js
    sidebar.js
android/
ios/
artefatos/
```

The main navigation is defined in `src/App.js`. Screen components access Firebase Realtime Database directly through the Firebase client SDK.

## Firebase data areas

The implementation reads and writes the following Realtime Database paths:

| Path | Purpose |
| --- | --- |
| `/estoque/` | Available inventory by quantity |
| `/valores/` | Prices used to calculate sales |
| `/fechamentoCaixa/` | Cash-flow totals and receivables |
| `/vendas/` | Sales and payment status |
| `/saidaCaixa/` | Expense / cash-out records grouped by date |

The original app configuration is in `src/App.js`. It contains a placeholder Firebase API key. To experiment with the app, create your own Firebase project and configure the client with that project's values. Review Realtime Database security rules and authentication before connecting any real business data. Never commit service-account credentials or private keys.

## Running the legacy project

The project uses the React Native 0.55-era CLI and dependency stack. A compatible legacy Node.js, Android SDK / Gradle, and/or Xcode environment is required; current toolchains may not build it without a migration.

1. Install the dependencies with `npm install`.
2. Configure your own Firebase client settings in `src/App.js`.
3. Start the Metro bundler with `npm start`.
4. Open and run the Android or iOS native project using a toolchain compatible with React Native 0.55.

These steps describe the original project setup; a clean build has not been verified in a current environment.

## Design and project artifacts

The original repository includes supporting planning and design material:

- [Project Model Canvas](artefatos/Project%20Canvas.pdf)
- [Use-case diagram](artefatos/Diagrama%20de%20Caso%20de%20Uso1.png)
- [Database JSON Schema](https://gist.github.com/douglasmachry/3e79fae7863ef064a3515fe2df36aedc)
- [Wireframes](artefatos/wireframes.md)
- [Class diagram](artefatos/Diagrama%20de%20Classes%20(1).png)

## Notes before production use

This codebase is useful as a reference for the original product workflows, but it should not be deployed with real inventory or financial data as-is. A production successor would need, at minimum, a supported React Native version, authenticated access, restrictive Firebase rules, validated inputs, safer transaction handling, listener cleanup, automated tests and configuration kept outside the source code.
