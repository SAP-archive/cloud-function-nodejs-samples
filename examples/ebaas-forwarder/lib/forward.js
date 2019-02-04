'use strict';

const http = require('http');
const request = require('request');

const oauth = require('./oauth'); // cached oauth token access
const Guard = require('./guard'); // synchronize one incoming request with multiple outgoing requests

/**
 * @param {FaasEvent} event
 * @param {FaasContext} context
 * @return {Promise|*}
 */
module.exports = function (event, context) {
    return oauth.token(context).then((accessToken) => new Promise((resolve, reject) => {
        const guard = new Guard(resolve, reject);
        const hdr = { 'Authorization': 'Bearer ' + accessToken };
        const src = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (src.data) {
            post(guard, context, hdr, mapOrder(src.data),
                'SalesOrders',
                `SalesOrders('${src.data.orderId}')`
            );
        }

        if (src.item) for (const item of src.item) {
            post(guard, context, hdr, mapItem(item),
                'SalesOrderItems',
                `SalesOrderItems(ItemNumber='${item.orderItem}',SalesOrderID='${item.orderId}')`
            );
        }
    }));
};

function mapOrder(data) {
    return {
        SalesOrderID: data.orderId,
        CustomerID: data.customerId,
        SalesOrderDate: mapDate(data.orderDate),
        CustomerOrderNumber: data.customerOrderNumber,
        SalesOrderStatus: data.orderStatus
    };
}

function mapItem(item) {
    return {
        SalesOrderID: item.orderId,
        ItemNumber: item.orderItem,
        MaterialNumber: item.materialNumber,
        MaterialDescription: item.materialDescription,
        CustomerMaterialNumber: item.customerMaterialNumber,
        ItemStatus: item.itemStatus,
        Quantity: mapQuantity(item.orderQuantity),
        UnitOfMeasure: item.orderUOM
    };
}

function mapDate(src) {
    if (src.length !== 8) {
        return '';
    }
    return `${src.slice(0,4)}-${src.slice(4,6)}-${src.slice(6)}T12:00:00Z`;
}

function mapQuantity(src) {
    return parseFloat(src);
}

function post(guard, context, headers, payload, path, patchPath) {
    if (!guard.lock())
        return;

    const service = context.getSecretValueString('ebaas-forwarder', 'service');
    request.post({ url: service + path, headers: headers, json: true, body: payload }, (err, res, body) => {
        if (err) {
            guard.unlock(err);
        } else if ( res.statusCode === 201) {
            guard.unlock();
        } else if ( [400, 401, 404, 404, 406].includes(res.statusCode)) {
            if (body) console.log(JSON.stringify(body, null, 4));
            guard.unlock(new Error(`post failed, code ${res.statusCode}, ${http.STATUS_CODES[res.statusCode]}`));
        } else {
            patch(guard, context, headers, payload, patchPath);
        }
    });
}

function patch(guard, context, headers, payload, path) {
    const service = context.getSecretValueString('ebaas-forwarder', 'service');
    request.patch({ url: service + path, headers: headers, json: true, body: payload }, (err, res, body) => {
        if (err) {
            guard.unlock(err);
        } else if ( [200, 202, 204].includes(res.statusCode)) {
            guard.unlock();
        } else {
            if (body) console.log(JSON.stringify(body, null, 4));
            guard.unlock(new Error(`patch failed, code ${res.statusCode}, ${http.STATUS_CODES[res.statusCode]}`));
        }
    });
}

