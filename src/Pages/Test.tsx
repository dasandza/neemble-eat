import {useState, useEffect} from "react";
import {OrderJson} from "../schema.ts";
import {apiUrl} from "../api/functions/key.ts";


function Test() {
    const [orders, setOrders] = useState<OrderJson[]>([])
    const restaurantID = "FUHT4zQL5Umz99BN7dUI"
    const BASE_URL = apiUrl

    // Establish the WebSocket connection and handle events
    useEffect(() => {
        let ws: WebSocket;
        const connectWebSocket = () => {
            // Using protocol-relative URL to switch between ws and wss dynamically
            const protocol = window.location.protocol === 'https:' ? 'ws:' : 'ws:';
            ws = new WebSocket(`${protocol}//${BASE_URL}/ws/${restaurantID}/order`);

            ws.onopen = () => {
                console.log('WebSocket Connected');
            };

            ws.onmessage = (event) => {
                const order: OrderJson = JSON.parse(event.data);

                setOrders(prev => [...prev, order]);
            };

            ws.onerror = (error) => {
                console.error('WebSocket Error:', error);
                console.log('Reconnecting WebSocket...');
                setTimeout(connectWebSocket, 3000);
            };

            ws.onclose = (event) => {
                console.log('WebSocket Disconnected: ', event);
                if (!event.wasClean) {
                    console.log('Reconnecting WebSocket...');
                    setTimeout(connectWebSocket, 2000); // Try to reconnect every 2 seconds
                }
            };
        };

        setTimeout(connectWebSocket, 1000);

        return () => {
            if (ws) ws.close();
        };

    }, [restaurantID]);

    
    useEffect(() => {
        let ws: WebSocket;
        const connectWebSocket = () => {
            const protocol = window.location.protocol === 'https:' ? 'ws:' : 'ws:';
            ws = new WebSocket(`${protocol}//${BASE_URL}/ws/${restaurantID}/billed`);

            ws.onopen = () => {
                console.log('WebSocket Connected');
            };

            ws.onmessage = (event) => {
                const billedOrders: OrderJson[] = JSON.parse(event.data);
                const billedOrdrsIDs = billedOrders.map((order) => order.id)
                setOrders(orders.filter((order) => !billedOrdrsIDs.includes(order.id)));
            };

            ws.onerror = (error) => {
                console.error('WebSocket Error:', error);
                console.log('Reconnecting WebSocket...');
                setTimeout(connectWebSocket, 3000);
            };

            ws.onclose = (event) => {
                console.log('WebSocket Disconnected: ', event);
                if (!event.wasClean) {
                    console.log('Reconnecting WebSocket...');
                    setTimeout(connectWebSocket, 3000); // Try to reconnect every 3 seconds
                }
            };
        };

        setTimeout(connectWebSocket, 1000);

        return () => {
            if (ws) ws.close();
        };

    }, [restaurantID]);

    return (
        <div>
            <h1>WebSocket Communication</h1>
            <div>
                <h2>Orders</h2>
                {orders.map((order, index) => (
                    <div key={index}>
                        <p>{order.orderedItemName}</p>
                        <p>{order.tableNumber}</p>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default Test;