class Mpos {
    // instantiate() {
    //     (function () {
    //         var slice = [].slice;
    //         var open = XMLHttpRequest.prototype.open;
    //         XMLHttpRequest.prototype.open = function () {
    //             var args = slice.call(arguments);
    //             return open.apply(this, args);
    //         };
    //     })();

    //     $(function () {
    //         let order = JSON.parse(localStorage.getItem('order_for_mpos'));

    //         var mynew = new cdlMpos.setup({
    //             PAYMENT_NUMBER: order.order_id,
    //             TRANSACTION_TYPE_AMOUNT: order.total_amount,
    //             AGENT_USERNAME: order.merchant_username,
    //             CHANNEL_TYPE: "CDL",
    //             TERMINAL_ID: "2030DM85",
    //             PRODUCT_ID: order.merchant_username+'_'+order.order_id,
    //             PROCESSOR_ID: "ISW",
    //             callbackSuccess: function (data) {
    //                 console.log(data)
    //                 alert(data.responseCode + "  Response description :: " + data.responseDescription);
    //             }, CallBackFail: function (data) {
    //                 alert(data.responseCode);

    //             }, CallBackCancel: function (data) {
    //                 alert(data.responseDescription);
    //             }
    //         });

    //         mynew.ProcessToPayment();
    //     });
    // }
}

export default Mpos;