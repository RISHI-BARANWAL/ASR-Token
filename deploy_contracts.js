const ASR = artifacts.require('ASR.sol');
const PaymentProcessor = artifacts.require('PaymentProcessor.sol');

module.exports = async function (deployer, network, addresses,) {
    const [admin, payer, _] = addresses;

    if(network === 'develop') {
        await deployer.deploy(ASR);    //send transaction
        const ASR = await ASR.deployed();  //wait for transaction
        await ASR.faucet(payer, web3.utils.token('10000'));
        // 1 ASR token =1 * 10 * 18 "ASR wei"
        // 1 Ether =1 * 10 * 18 "ether wei"

        await deployer.deploy(PaymentProcessor, admin, ASR.address);
    }
    else{
        const ADMIN_ADDRESS ='';
        const ASR_ADDRESS ='';
        await deployer.deploy(PaymentProcessor, ADMIN_ADDRESS, ASR_ADDRESS);
    }
  
};
