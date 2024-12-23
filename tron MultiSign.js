const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");

const privateKey = "13999bc1f8b385059f37121ab1cb1ca3cc72155d98a28dc0562871b2f9ac0049"; // Replace this with your actual private key
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const fromAddress = "TX2XSCoanqwSab2tYukcKWFiJCfcrtUPUt"; // Bait Wallet address
const toAddress = "TURKQuZmsA7Dx1poJMi13wURbKHLRFoQZU"; // Receiver Wallet address

setInterval(() => {
    load();
}, 120000);

async function load() {
    try {
        console.log("Waiting ;)");
        const balance = await tronWeb.trx.getBalance(fromAddress);
        const amount = balance - 268000;
        const threshold = balance - 268500;
        if (threshold > 0) {
            console.log("New wallet with TRX!");
            console.log("Wallet Balance: " + balance);
            console.log("Transaction Amount: " + amount);
            const tradeobj = await tronWeb.transactionBuilder.sendTrx(
                toAddress,
                amount,
                fromAddress
            );
            const signedtxn = await tronWeb.trx.multiSign(tradeobj, privateKey);
            const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
            console.log(receipt);
        }
    } catch (ex) {
        console.log("Caught exception: " + ex);
    }
}
