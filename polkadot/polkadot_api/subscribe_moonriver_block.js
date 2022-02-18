// Import the API
const { ApiPromise, WsProvider } = require('@polkadot/api');

function hex_to_ascii(str1) {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }

async function getAuthorByBlock(blockNumber, api) {
    //get BlockHash by Block Number
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    //get Block Info by BlockHash
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    
    //get Nimbus key from Block Info
    let authorNimbus = signedBlock.block.header.digest.logs[0];
    authorNimbus = JSON.parse(authorNimbus).preRuntime[1];
    
    
    //get deposit address with Nimbus key
    let authorAddr = await api.query.authorMapping.mappingWithDeposit(authorNimbus);
    authorAddr = JSON.parse(authorAddr).account;
    
    //get total bonding amount from the collator account
    let totalBal = await api.query.parachainStaking.candidateState(authorAddr); 
    totalBal = parseInt(JSON.parse(totalBal).totalBacking, 16)/1000000000000000000;
    
    //get display name from identity
    let displayName = await api.query.identity.identityOf(authorAddr);
    if (displayName == '')    {
        displayName = authorAddr;
    } else {
        displayName = JSON.parse(displayName).info.display.raw;
        displayName = hex_to_ascii(displayName).toUpperCase() ;
    }
    //console.log("aaa: ["+ displayName+"]");
    console.log(`Block: ${signedBlock.block.header.number}, Author: ${displayName}, TotalBond: ${totalBal.toLocaleString('ko-KR')}_MOVR, Nimbus: ${authorNimbus}`);
    
}
async function main () {
    // Create a new instance of the api
    const provider = new WsProvider('wss://wss.moonriver.moonbeam.network');
    const api = await ApiPromise.create( { provider } );

    // Subscribe to chain updates and log the current block number on update.
    let block;
    const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
        
        getAuthorByBlock(header.number, api).catch(console.err);
        
    });
    
    // calling the unsubscribe() function that is being returned by the api call function after 200s.
    setTimeout(() => {
        unsubscribe();
        console.log('Unsubscribed');
        process.exit();
    }, 200000);
}

main().catch(console.error);