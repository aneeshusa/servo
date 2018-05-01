// META: script=websocket.sub.js

        var testOpen = async_test("W3C WebSocket API - Send unpaired surrogates on a Secure WebSocket - Connection should be opened");
        var testMessage = async_test("W3C WebSocket API - Send unpaired surrogates on a Secure WebSocket - Message should be received");
        var testClose = async_test("W3C WebSocket API - Send unpaired surrogates on a Secure WebSocket - Connection should be closed");

        var data = "\uD807";
        var replacementChar = "\uFFFD";
        var wsocket = CreateWebSocket(true, false, false);
        var isOpenCalled = false;

        wsocket.addEventListener('open', testOpen.step_func(function (evt) {
            wsocket.send(data);
            isOpenCalled = true;
            testOpen.done();
        }), true);

        wsocket.addEventListener('message', testMessage.step_func(function (evt) {
            assert_equals(evt.data, replacementChar);
            wsocket.close();
            testMessage.done();
        }), true);

        wsocket.addEventListener('close', testClose.step_func(function (evt) {
            assert_true(isOpenCalled, "WebSocket connection should be open");
            assert_equals(evt.wasClean, true, "wasClean should be true");
            testClose.done();
        }), true);