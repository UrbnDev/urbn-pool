const UrbnToken = artifacts.require('UrbnToken')
const DaiToken = artifacts.require('DaiToken')
const Faucet = artifacts.require('Faucet')
const RockyFarm = artifacts.require('RochyFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy Urbn Token
  await deployer.deploy(UrbnToken)
  const urbnToken = await UrbnToken.deployed()

  // Deploy RochyFarm
  await deployer.deploy(RockyFarm, urbnToken.address, daiToken.address)
  const rochyFarm = await RockyFarm.deployed()

  // Transfer all tokens to RochyFarm (1 million)
  await urbnToken.transfer(rochyFarm.address, '1000000000000000000000000')

  // Deploy Faucet
  await deployer.deploy(Faucet, daiToken.address);

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '10000000000')
}
