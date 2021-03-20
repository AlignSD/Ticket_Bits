import { assert } from "chai"

const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await marketplace.name()
            assert.equal(name, 'Marketplace')
        })
    })

    describe('tickets', async() => {
       let result, ticketCount
       
        before(async () => {
            result = await marketplace.createTicket('Crssd', web3.utils.toWei('1', 'Ether'), { from: seller })
            ticketCount = await marketplace.ticketCount()
        })

        it('creates tickets', async () => {
            //SUCCESS
            assert.equal(ticketCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), ticketCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Crssd', 'is correct')
            assert.equal(event.price, '1000000000000000000', 'is correct')
            assert.equal(event.owner, seller, 'is correct')
            assert.equal(event.purchased, false, 'purchased is correct')


            //FAILURES: Ticket must have a name
            await  await marketplace.createTicket('', web3.utils.toWei('1', 'Ether'), { from: seller}).should.be.rejected;
            //FAILURES: Ticket must have a price
            await  await marketplace.createTicket('Crssd', 0, { from: seller}).should.be.rejected;
        })

        it ('list tickets', async() => {
            const ticket = await marketplace.tickets(ticketCount)
            assert.equal(ticket.id.toNumber(), ticketCount.toNumber(), 'id is correct')
            assert.equal(ticket.name, 'Crssd', 'is correct')
            assert.equal(ticket.price, '1000000000000000000', 'is correct')
            assert.equal(ticket.owner, seller, 'is correct')
            assert.equal(ticket.purchased, false, 'purchased is correct')
        })

        it ('sells tickets', async() => {
            // Track the seller balance before purchase
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            // SUCESS: Buyer makes purchase
            result = await marketplace.purchaseTicket(ticketCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

            // Check logs
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), ticketCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Crssd', 'is correct')
            assert.equal(event.price, '1000000000000000000', 'is correct')
            assert.equal(event.owner, buyer, 'is correct')
            assert.equal(event.purchased, true, 'purchased is correct')

            // Check that seller recieved funds
            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let price
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)

            const expectedBalance = oldSellerBalance.add(price)

            assert.equal(newSellerBalance.toString(), expectedBalance.toString())

            // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
            await marketplace.purchaseTicket(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            // FAILURE: Buyer tries to buy without enough ether
            await marketplace.purchaseTicket(ticketCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
            // FAILURE: Deployer tries to buy the product, i.e., product can't be purchased twice
            await marketplace.purchaseTicket(ticketCount, { from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
            await marketplace.purchaseTicket(ticketCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })

    })
    
})

