
const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { web3Enable } = require('@polkadot/extension-dapp');


let ENDPOINT = {

    'local': 'ws://127.0.0.1:9944',
    'live': 'wss://rpc.polkadot.io'
}

const ACCOUNT = {

    Alice: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    Bob: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    Charlie: '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y',
    Dave: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
    Eve: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw',
    ito: '5F9jBNMWCRh48XVzgGZC4BBWaHLHt128yK53kddyYd6x4P3W'
}

let COUNT = 0;

async function prepare(endPoint) {

    const provider = new WsProvider(endPoint);
    const api = await ApiPromise.create({ provider });

    return api
}

async function main() {

    const api = await prepare(ENDPOINT['local']);
    const keyring = new Keyring({ type: 'sr25519' });

    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);

    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

    //subscribe & unssubsribe to newly generated blocks 
    // const unsubsribe = await api.rpc.chain.subscribeNewHeads((header) => {

    //     console.log(`Chain is at block: #${header.number} & hash: ${header.hash}`)
    // });

    // Listen to balance changes
    let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(ACCOUNT['Alice']);
    console.log(`Free is ${previousFree}, Nonce is ${previousNonce}`);

    api.query.system.account(ACCOUNT['Alice'], ({ data: { free: currentFree }, nonce: currentNonce }) => {

        const change = currentFree.sub(previousFree);
        console.log(`Change is ${change}`)

        if (!change.isZero()) {

            console.log(`New balance change of ${change}, nonce ${currentNonce}`);

            previousFree = currentFree;
            previousNonce = currentNonce;
        }
    });

    const alice = keyring.addFromUri('//Alice');
    console.log(alice);
    const transfer = api.tx.balances.transfer(ACCOUNT['Bob'], 12345);
    const hash = await transfer.signAndSend(alice);

    console.log('Transfer sent with hash', hash.toHex());

    // setTimeout(() => {

    //     unsubsribe();
    //     console.log('Unsubscribed');
    // }, 10000);
}

async function read_storage() {

    const api = await prepare(ENDPOINT['local']);
    const { hash, parentHash } = await api.rpc.chain.getHeader();

    console.log(`last header hash ${hash.toHex()}`);
}

async function get_web3Account() {

    const api = await prepare(ENDPOINT['live']);
    const extensions = await web3Enable('polkadot-js');

    if (extensions.length == 0) {

        console.log("You have no extentions!")
        return;
    }
}

// main().catch(console.error);
// read_storage().catch(console.error);

get_web3Account().catch(console.error);