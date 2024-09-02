# LiquidityPoolForm

A React-based decentralized application (dApp) for interacting with Stellar's Liquidity Pools. This application allows users to generate keypairs, fund accounts, add liquidity, swap assets, and withdraw from liquidity pools on the Stellar testnet.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Demo Video](#demo-video)
- [Tweet Link](#tweet-link)
- [Transactions](#transactions)
- [License](#license)

## Introduction

This dApp provides a user-friendly interface for interacting with Stellar's liquidity pools. Users can perform a variety of actions such as generating keypairs, funding accounts, adding liquidity to pools, swapping assets, and withdrawing liquidity. This project demonstrates the use of Stellar SDK in a React environment, integrating features like transaction building, sending, and handling responses.

## Features

- **Keypair Generation**: Create Stellar keypairs directly within the app.
- **Account Funding**: Easily fund a Stellar account using the Friendbot API.
- **Add Liquidity**: Add liquidity to Stellar's liquidity pools.
- **Swap Assets**: Swap assets within the liquidity pool.
- **Withdraw Liquidity**: Withdraw funds from the liquidity pool.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install Node.js (version 14.x or later).
- **npm**: Node package manager comes with Node.js. Make sure you have it installed.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Psalmuel01/stellar-defi-frontend.git
    cd LiquidityPoolForm
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the application**:

    ```bash
    npm run dev
    ```

    The app should now be running on `http://localhost:5173`.

## Usage

1. **Generate Keypair**:
   - Click on the "Generate Keypair" button to create a new Stellar keypair.
   - The public key (address) will be displayed for further actions.

2. **Fund Account**:
   - Use the "Fund Account" button to send test Lumens (XLM) to your newly generated Stellar address.

3. **Add Liquidity**:
   - Input the asset name and the amounts of Asset A and Asset B.
   - Click "Add Liquidity" to create or add to a liquidity pool.

4. **Swap Assets**:
   - Specify the maximum amount of Asset A to swap and the desired amount of Asset B.
   - Execute the swap by clicking "Swap Assets".

5. **Withdraw Liquidity**:
   - Input the amount you wish to withdraw from the liquidity pool.
   - Click "Withdraw Liquidity" to perform the operation.

## Demo Video

[Demo video](https://www.loom.com/share/2aea7c9d3a8f4a959dc7a996c243907a?sid=0dbe0e1e-df67-4abe-b1d5-575c81a085b8)

## Tweet Link

[Tweet Link](https://x.com/psalmuel_1st/status/1830569215675228585)

## Transactions

- [Pool Created](https://stellar.expert/explorer/testnet/tx/855946ae6b620b766b91e8f323148a41443df4ece6f3cf41041b0dc6eaca960d)
- [Swap Performed](https://stellar.expert/explorer/testnet/tx/9ac11dd143208833519935de3b9a588575e34e6162cd6618e1df9b459c39e885)
- [Withdrawal](https://stellar.expert/explorer/testnet/tx/8defa95acec784274cf38c3ceb3d655bb3be11e38125624fdf2faf1c0fa41a1c)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.