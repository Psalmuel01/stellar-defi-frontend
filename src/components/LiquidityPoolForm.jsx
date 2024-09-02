import React, { useState } from 'react';
import { TextField, Button, Box, Card, Typography } from '@mui/material';
import * as StellarSdk from '@stellar/stellar-sdk';

const server = new StellarSdk.SorobanRpc.Server('https://soroban-testnet.stellar.org');

function LiquidityPoolForm() {
    const [amountA, setAmountA] = useState('');
    const [amountB, setAmountB] = useState('');
    const [assetName, setAssetName] = useState('');
    const [keypair, setKeypair] = useState('');
    const [keypairAddress, setKeypairAddress] = useState('');
    const [isFunding, setIsFunding] = useState('');
    const [createPoolResponse, setCreatePoolResponse] = useState('');
    const [withdrawResponse, setWithdrawResponse] = useState('');
    const [liquidityPoolId, setLiquidityPoolId] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const generateKeypair = () => {
        // create random keypair
        const defiKeypair = StellarSdk.Keypair.random();
        setKeypair(defiKeypair);
        setKeypairAddress(defiKeypair.publicKey());
        console.log("Keypair generated:", defiKeypair.publicKey());
        console.log(keypair)
    }

    const fundAccount = async (address) => {
        setIsFunding(true);
        const friendbotUrl = `https://friendbot.stellar.org?addr=${address}`;
        try {
            let response = await fetch(friendbotUrl);
            if (response.ok) {
                alert(`Account successfully funded.`);
                console.log(response);
                return true;
            } else {
                console.log(`Something went wrong funding account`);
                return false;
            }
        } catch (error) {
            console.error(`Error funding account ${address}:`, error);
            alert(`Something went wrong funding account. Check console for details.`);
            return false;
        } finally {
            setIsFunding(false);
        }
    }

    const addLiquidity = async (e) => {
        e.preventDefault();
        try {
            const defiAccount = await
                server.getAccount(keypairAddress);
            // create custom asset from input
            const customAsset = new StellarSdk.Asset(assetName,
                keypairAddress);
            // created a liquidity pool asset with the native xlm and my custom asset
            const lpAsset = new StellarSdk.LiquidityPoolAsset(
                StellarSdk.Asset.native(),
                customAsset,
                StellarSdk.LiquidityPoolFeeV18
            );
            setLiquidityPoolId(StellarSdk.getLiquidityPoolId(
                'constant_product',
                lpAsset
            ).toString('hex'));
            // console.log(lpAsset.getLiquidityPoolParameters());
            const addTransaction = new
                StellarSdk.TransactionBuilder(defiAccount, {
                    fee: StellarSdk.BASE_FEE,
                    networkPassphrase: StellarSdk.Networks.TESTNET,
                })
                .addOperation(
                    StellarSdk.Operation.changeTrust({
                        asset: lpAsset,
                    })
                )
                .addOperation(
                    StellarSdk.Operation.liquidityPoolDeposit({
                        liquidityPoolId: liquidityPoolId,
                        maxAmountA: amountA,
                        maxAmountB: amountB,
                        minPrice: { n: 1, d: 1 },
                        maxPrice: { n: 1, d: 1 },
                    })
                )
                .setTimeout(30)
                .build();
            addTransaction.sign(keypair);
            const result = await server.sendTransaction(addTransaction);
            console.log('Transaction successful:', result);
            setCreatePoolResponse(`Liquidity Pool Created. Transaction URL: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding liquidity. Check console for details.');
        } finally {
            setAmountA('');
            setAmountB('');
            setAssetName('');
        }
    };

    const withdraw = async (e) => {
        e.preventDefault();
        const lpWithdrawTransaction = new TransactionBuilder(defiAccount, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        })
            .addOperation(Operation.liquidityPoolWithdraw({
                liquidityPoolId: StellarSdk.getLiquidityPoolId(
                    'constant_product',
                    lpAsset
                ).toString('hex'),
                amount: withdrawAmount,
                minAmountA: '0',
                minAmountB: '0'
            }))
            .setTimeout(30)
            .build();
        lpWithdrawTransaction.sign(keypair);
        try {
            const result = await server.sendTransaction(lpWithdrawTransaction);
            setWithdrawResponse(`Withdrawal Successful. Transaction URL: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
        } catch (error) {
            console.log(`Error withdrawing from Liquidity Pool: ${error}`);
        }
    }

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: 2
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 10 }}>
                <Button variant='outlined' onClick={generateKeypair}>Generate Keypair</Button>
                <Card sx={{ mt: 2, fontSize: 11, textAlign: 'center' }}>{keypairAddress}</Card>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 5 }}>
                <Button variant='outlined' onClick={() => fundAccount(keypairAddress)}>{isFunding ? 'Funding...' : 'Fund Account'}</Button>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 5 }} onSubmit={addLiquidity}>
                <Typography variant="p" component="h3" gutterBottom>
                    Add Liquidity
                </Typography>
                <TextField
                    label="Asset Name"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    required
                />
                <TextField
                    label="AmountA"
                    type="number"
                    value={amountA}
                    onChange={(e) => setAmountA(e.target.value)}
                    required
                />
                <TextField
                    label="AmountB"
                    type="number"
                    value={amountB}
                    onChange={(e) => setAmountB(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained">
                    Add Liquidity
                </Button>
                <Card sx={{ mt: 2, fontSize: 14, textAlign: 'center' }}>{createPoolResponse}</Card>
            </form>

            <form style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 5 }} onSubmit={withdraw}>
                <Typography variant="p" component="h3" gutterBottom>
                    Withdraw from pool
                </Typography>
                <TextField
                    label="Liquidity Pool Id"
                    value={liquidityPoolId}
                    required
                />
                <TextField
                    label="WithdrawAmount"
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained">
                    Withdraw Liquidity
                </Button>
            </form>
        </Box>
    );
}

export default LiquidityPoolForm;