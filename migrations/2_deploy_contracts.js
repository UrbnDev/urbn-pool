const UrbnToken = artifacts.require('UrbnToken')
const DaiToken = artifacts.require('DaiToken')
const RockyFarm = artifacts.require('RochyFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy Dapp Token
  await deployer.deploy(UrbnToken)
  const urbnToken = await UrbnToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(RockyFarm, UrbnToken.address, daiToken.address)
  const tokenFarm = await RockyFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  await urbnToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '100000000000000000000')
}
