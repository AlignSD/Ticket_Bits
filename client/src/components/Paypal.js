import React, {useRef, useState, useEffect, useContext} from "react";
import {TicketsContext} from '../utils/TicketsContext'

export default function Paypal(){
    const {tickets} = useContext(TicketsContext)
    console.log(tickets)
    const ticketName = tickets[0].name
    const ticketValue = tickets[0].price

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
        

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: 'Ticket Bits Checkout',
                            amount: {
                                currency_code: 'USD',
                                value: {ticketValue},
                            }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    console.log('ORDER', order);
                },
                onError: err => {
                    setError(err);
                    console.error('ERROR', err);
                },
            })
            .render(paypalRef.current);
    }, []);

    if (paidFor) {
        return (
            <div>
                Thanks for making the purchase.
            </div>
        )
    }

    if (error) {
        return (
            <div>
                Error in processing order. Please Retry again
            </div>
        )
    }

    return (
        <div>
            <h1>This is a Test</h1>
            <div>{ticketName}</div>
            <div>{ticketValue}</div>
            <div ref={paypalRef} />
        </div>
    )
}

