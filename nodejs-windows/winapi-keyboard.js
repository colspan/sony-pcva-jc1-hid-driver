// https://gist.github.com/DimaCrafter/b5e3beae8d87c6e088a79edaa32ef999 
// https://stackoverflow.com/questions/41350341/using-sendinput-in-node-ffi

const ffi = require("ffi-napi");
const ref =require( "ref-napi");
const refStruct = require("ref-struct-di")(ref);
const arch = require("os").arch();

const INPUT_KEYBOARD = 0x1;
const KEYEVENTF_KEYUP = 0x2;
const KEYEVENTF_SCANCODE = 0x8;

const InputStruct = refStruct({
  type: "int",
  "???": "int",
  wVK: "short",
  wScan: "short",
  dwFlags: "int",
  time: "int",
  dwExtraInfo: "int64",
});

const SCANCODES = {
  ESC: 0x1,
  F1: 0x3b,
  F2: 0x3c,
  F3: 0x3d,
  F4: 0x3e,
  F5: 0x3f,
  F6: 0x40,
  F7: 0x41,
  F8: 0x42,
  F9: 0x43,
  F10: 0x44,

  Tilde: 0x29,
  Num1: 0x2,
  Num2: 0x3,
  Num3: 0x4,
  Num4: 0x5,
  Num5: 0x6,
  Num6: 0x7,
  Num7: 0x8,
  Num8: 0x9,
  Num9: 0xa,
  Num0: 0xb,
  Minus: 0xc,
  Equal: 0xd,
  Backspace: 0xe,

  Tab: 0xf,
  Q: 0x10,
  W: 0x11,
  E: 0x12,
  R: 0x13,
  T: 0x14,
  Y: 0x15,
  U: 0x16,
  I: 0x17,
  O: 0x18,
  P: 0x19,
  BracketOpen: 0x1a,
  BracketClose: 0x1b,
  Enter: 0x1c,

  CapsLock: 0x3a,
  A: 0x1e,
  S: 0x1f,
  D: 0x20,
  F: 0x21,
  G: 0x22,
  H: 0x23,
  J: 0x24,
  K: 0x25,
  L: 0x26,
  Colon: 0x27,
  Quote: 0x28,
  Slash: 0x2b,

  LShift: 0x2a,
  Z: 0x2c,
  X: 0x2d,
  C: 0x2e,
  V: 0x2f,
  B: 0x30,
  N: 0x31,
  M: 0x32,
  LT: 0x33,
  GT: 0x34,
  Question: 0x35,
  RShift: 0x36,

  LCtrl: 0x1d,
  LAlt: 0x38,
  Space: 0x39,
  ScrollLock: 0x46,

  NumLock: 0x45,
  NumpadAsterisk: 0x37,
  NumpadMinus: 0x4a,
  NumpadPlus: 0x4e,
  Numpad1: 0x4f,
  Numpad2: 0x50,
  Numpad3: 0x51,
  Numpad4: 0x4b,
  Numpad5: 0x4c,
  Numpad6: 0x4d,
  Numpad7: 0x47,
  Numpad8: 0x48,
  Numpad9: 0x49,
  Numpad0: 0x52,
  NumpadDot: 0x53,
};

const user32 = ffi.Library("user32", {
  SendInput: ["int", ["int", InputStruct, "int"]],
  MapVirtualKeyExA: ["uint", ["uint", "uint", "int"]],
});

function toggle(key, status) {
  const entry = new InputStruct();
  entry.type = INPUT_KEYBOARD;
  entry.time = 0;
  entry.dwExtraInfo = 0;
  entry.dwFlags = status
    ? KEYEVENTF_SCANCODE
    : KEYEVENTF_SCANCODE | KEYEVENTF_KEYUP;
  entry.wVK = 0;
  entry.wScan = SCANCODES[key];

  user32.SendInput(1, entry, arch == "x64" ? 40 : 28);
}

function press(key) {
  toggle(key, "down");
//   toggle(key, "up");
}

module.exports = {
  toggle,
  press,
};
