const winApiKey = require("./winapi-keyboard");

// TODO https://github.com/MadLittleMods/node-usb-detection

// winApiKey.press("T");
// winApiKey.press("E");
// winApiKey.press("S");
// winApiKey.press("T");

const HID = require("node-hid");
const devices = HID.devices();

console.log(devices);

const vendorId = 0x054c;
const productId = 0x00c4;

const device = new HID.HID(vendorId, productId);

console.log(device);

function parseHidEvent(rawBuffer) {
  const rawData = new Uint8Array(rawBuffer);
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

  const [
    buttonPressed,
    buttonNone,
    buttonF,
    buttonE,
    buttonD,
    buttonC,
    buttonB,
    buttonA,
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
    arrowKeyPressed,
    arrowKeyNone1,
    arrowKeyNone2,
    arrowKeyRight,
    arrowKeyLeft,
    arrowKeyDown,
    arrowKeyUp,
    arrowKeyCenter,
  ] = inputBits[1];
  const [
    dialTurned,
    dialTurnedLeft,
    dialNone1,
    dialNone2,
    dialNone3,
    dialNone4,
    dialNone5,
    dialTurned2,
  ] = inputBits[2];

  const keyStatus = {
    buttonPressed,
    buttonNone,
    buttonF,
    buttonE,
    buttonD,
    buttonC,
    buttonB,
    buttonA,
    arrowKeyPressed,
    arrowKeyNone1,
    arrowKeyNone2,
    arrowKeyRight,
    arrowKeyLeft,
    arrowKeyDown,
    arrowKeyUp,
    arrowKeyCenter,
    dialTurned,
    dialTurnedLeft,
    dialNone1,
    dialNone2,
    dialNone3,
    dialNone4,
    dialNone5,
    dialTurned2,
  };

  if (!buttonPressed && !arrowKeyPressed && !dialTurned) return;
  console.log(keyStatus);

  if (buttonA) {
    winApiKey.press("A");
  }
  if (buttonB) {
    winApiKey.press("B");
  }
  if (buttonC) {
    winApiKey.press("C");
  }
  if (buttonD) {
    winApiKey.press("D");
  }
  if (buttonE) {
    winApiKey.press("E");
  }
  if (buttonF) {
    winApiKey.press("F");
  }
  if (dialTurned) {
    if (dialTurnedLeft) {
      winApiKey.press("L");
    } else {
      winApiKey.press("R");
    }
  }
}

device.on("data", parseHidEvent);
// console.log(device.getFeatureReport())
