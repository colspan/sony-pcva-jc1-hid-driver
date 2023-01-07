async function main() {
  const devices = await navigator.hid.requestDevice({
    filters: [
      {
        vendorId: 0x054c,
        productId: 0x00c4,
      },
    ],
  });
  const device = devices[0];
  console.log(devices);

  function parseHidEvent(e) {
    const rawData = new Uint8Array(e.data.buffer);
    // console.log(rawData[0], rawData[1], rawData[2]);
    const inputBits = [];
    rawData.forEach((byte) => {
      const chunk = [];
      for (let j = 7; j >= 0; j--) {
        const b = ((byte >> j) & 0x1) > 0;
        chunk.push(b);
      }
      inputBits.push(chunk);
    });
    console.log(inputBits[2]);

    const [
      buttonPressed,
      buttonNone,
      buttonF,
      buttonE,
      buttonD,
      buttonC,
      buttonB,
      ButtonA,
    ] = inputBits[0];
    // console.log({
    //   buttonPressed,
    //   buttonNone,
    //   buttonF,
    //   buttonE,
    //   buttonD,
    //   buttonC,
    //   buttonB,
    //   ButtonA,
    // });

    const [
      ArrowKeyPressed,
      ArrowKeyNone1,
      ArrowKeyNone2,
      ArrowKeyRight,
      ArrowKeyLeft,
      ArrowKeyDown,
      ArrowKeyUp,
      ArrowKeyCenter,
    ] = inputBits[1];
    const [
      DialTurned,
      DialTurnedLeft,
      DialNone1,
      DialNone2,
      DialNone3,
      DialNone4,
      DialNone5,
      DiralTurned2,
    ] = inputBits[2];
  }

  if (device) {
    // 2. `HIDDevice.open`で接続を開く.
    await device.open();
    // 3. `HIDDevice.addEventListener`で`HIDDevice`からのinputを取得できるようにする.
    device.addEventListener("inputreport", parseHidEvent); // event handler
    // 4. `HIDDevice.sendReport` で`HIDDevice`にreport(hidの通信の単位)を送信する.
    // await device.sendReport(reportId :number, sendData: BufferSource);
    // await device.sendReport(0x01, Uint8Array.from(... ));
  }
}
