import { assert } from "chai"

const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Marketplace', ([deployer, eventhost, eventbuyer, seller, buyer]) => {
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

    describe('events', async() => {
        let result, eventCount

        before(async () => {
            result = await marketplace.eventCreated('Gorgon City', web3.utils.toWei('1', 'Ether'), '3/17/2021', 'Spin', 'Banging House Music', 30, { from: eventhost });
            eventCount = await marketplace.eventCount()
        })

        it('creates events', async () => {
            //SUCCESS
            assert.equal(eventCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), eventCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Gorgon City', 'is correct')
            assert.equal(event.price, '1000000000000000000', 'is correct')
            assert.equal(event.startDate, '3/17/2021', 'is correct')
            assert.equal(event.location, 'Spin', 'is correct')
            assert.equal(event.description, 'Banging House Music', 'is correct')
            assert.equal(event.quanity, 30, 'is correct')
            // assert.equal(event.soldout, false, "is correct")
            assert.equal(event.owner, eventhost, 'is correct')
            


            //FAILURES: Product must have a name
            await  await marketplace.eventCreated('', web3.utils.toWei('1', 'Ether'),'3/17/2021', 'Spin', 'Banging House Music', 30, { from: eventhost }).should.be.rejected;
            //FAILURES: Product must have a price
            await  await marketplace.eventCreated('Gorgon City', 0, '3/17/2021', 'Spin', 'Banging House Music', 30, { from: eventhost }).should.be.rejected;
            //FAILURES: Product must have a Start Date
            await  await marketplace.eventCreated('Gorgon City', 0, '', 'Spin', 'Banging House Music', 30, { from: eventhost }).should.be.rejected;
            //FAILURES: Product must have a location
            await  await marketplace.eventCreated('Gorgon City', 0, '3/17/2021', '', 'Banging House Music', 30, { from: eventhost }).should.be.rejected;
            //FAILURES: Product must have a location
            await  await marketplace.eventCreated('Gorgon City', 0, '3/17/2021', 'Spin', '', 30, { from: eventhost }).should.be.rejected;
            //FAILURES: Product must have a quanity
            await  await marketplace.eventCreated('Gorgon City', 0, '3/17/2021', 'Spin', 'Banging House Music', 0, { from: eventhost }).should.be.rejected;
        })

        it ('list events', async() => {
            const event = await marketplace.events(eventCount)
            assert.equal(event.id.toNumber(), eventCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Gorgon City', 'is correct')
            assert.equal(event.price, '1000000000000000000', 'is correct')
            assert.equal(event.startDate, '3/17/2021', 'is correct')
            assert.equal(event.location, 'Spin', 'is correct')
            assert.equal(event.description, 'Banging House Music', 'is correct')
            assert.equal(event.quanity, 30, 'is correct')
            assert.equal(event.soldout, false, 'the event is not sold out is correct')
            assert.equal(event.owner, eventhost, 'is correct')
        })

        it ('sells event tickets', async() => {
            // Track the seller balance before purchase
            let eventHostBalance
            eventHostBalance = await web3.eth.getBalance(eventhost)
            eventHostBalance = new web3.utils.BN(eventHostBalance)

            // SUCESS: Buyer makes purchase
            result = await marketplace.purchaseEventTicket(eventCount, { from: eventbuyer, value: web3.utils.toWei('1', 'Ether')})
           
            // Check logs
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), eventCount.toNumber(), 'id is correct')
            assert.equal(event.ticketId.toNumber(), 1, 'is correct')
            assert.equal(event.name, 'Gorgon City', 'is correct')
            assert.equal(event.price, '1000000000000000000', 'is correct')
            assert.equal(event.startDate, '3/17/2021', 'is correct')
            assert.equal(event.location, 'Spin', 'is correct')
            assert.equal(event.description, 'Banging House Music', 'is correct')
            assert.equal(event.quanity, 30, 'is correct')
            assert.equal(event.owner, eventbuyer, 'is correct')
            assert.equal(event.soldout, true, 'soldout is correct')

            // Check that seller recieved funds
            let newEventHostBalance
            newEventHostBalance = await web3.eth.getBalance(eventbuyer)
            newEventHostBalance = new web3.utils.BN(newEventHostBalance)

            let price
            price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)

            const expectedBalance = eventHostBalance.add(price)

            assert.equal(newEventHostBalance.toString(), expectedBalance.toString())

            assert.equal()

            // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
            await marketplace.purchaseTicket(99, { from: eventbuyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            // FAILURE: Buyer tries to buy without enough ether
            await marketplace.purchaseTicket(eventCount, { from: eventbuyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
            // FAILURE: Deployer tries to buy the product, i.e., product can't be purchased twice
            await marketplace.purchaseTicket(eventCount, { from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
            // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
            await marketplace.purchaseTicket(eventCount, { from: eventbuyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })

    })

    describe('tickets', async() => {
       let result, ticketCount
       
        before(async () => {
            result = await marketplace.addTicket('Crssd', web3.utils.toWei('1', 'Ether'), 'Water Front', 'Banging House Music Outside', 2, 3, { from: seller })
            ticketCount = await marketplace.ticketCount()
        })

        it('creates tickets', async () => {
            //SUCCESS
            assert.equal(ticketCount, 1)
            const reevent = result.logs[0].args
            assert.equal(reevent.id.toNumber(), ticketCount.toNumber(), 'id is correct')
            assert.equal(reevent.name, 'Crssd', 'is correct')
            assert.equal(reevent.price, '1000000000000000000', 'is correct')
            assert.equal(reevent.startDate, '3/18/2021', 'is correct')
            assert.equal(reevent.location, 'Waterfont Park', 'is correct')
            assert.equal(reevent.description, 'Banging House Music Outside', 'is correct')
            assert.equal(reevent.quanity, 2, 'is correct')
            assert.equal(reevent.availableTickets, 3, 'is correct')
            assert.equal(reevent.owner, seller, 'is correct')
            assert.equal(reevent.purchased, false, 'purchased is correct')


            // //FAILURES: Product must have a name
            // await  await marketplace.addTicket('', web3.utils.toWei('1', 'Ether'), { from: seller}).should.be.rejected;
            // //FAILURES: Product must have a price
            // await  await marketplace.addTicket('Crssd', 0, { from: seller}).should.be.rejected;
        })

        it ('list tickets', async() => {
            const ticket = await marketplace.tickets(ticketCount)
            assert.equal(ticket.id.toNumber(), ticketCount.toNumber(), 'id is correct')
            assert.equal(ticket.name, 'Crssd', 'is correct')
            assert.equal(ticket.price, '1000000000000000000', 'is correct')
            assert.equal(ticket.startDate, '3/18/2021', 'is correct')
            assert.equal(ticket.location, 'Waterfont Park', 'is correct')
            assert.equal(ticket.description, 'Banging House Music Outside', 'is correct')
            assert.equal(ticket.quanity, 2, 'is correct')
            assert.equal(ticket.availableTickets, 3, "is correct")
            assert.equal(ticket.owner, seller, 'is correct')
            assert.equal(ticket.purchased, false, 'purchased is correct')
        })

        it ('sells tickets', async() => {
            // Track the seller balance before purchase
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.isBN(oldSellerBalance)

            // SUCESS: Buyer makes purchase
            result = await marketplace.purchaseTicket(ticketCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

            // Check logs
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), ticketCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Crssd', 'is correct')
            assert.equal(event.price, '1000000000000000000', 'is correct')
            assert.equal(event.startDate, '3/18/2021', 'is correct')
            assert.equal(event.location, 'Waterfont Park', 'is correct')
            assert.equal(event.description, 'Banging House Music Outside', 'is correct')
            assert.equal(event.quanity, 2, 'is correct')
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

