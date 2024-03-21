#include <Keyboard.h>

const int button2 = 2;
const int button3 = 3;
const int button4 = 4;
unsigned long pressTime2 = 0;
unsigned long pressTime3 = 0;
unsigned long pressTime4 = 0;

const unsigned long longPressThreshold = 1000; // Threshold for long press

void setup() {
  pinMode(button2, INPUT_PULLUP);
  pinMode(button3, INPUT_PULLUP);
  pinMode(button4, INPUT_PULLUP);
  Keyboard.begin();
}

void loop() {
  checkButton(button2, 'u', 'j', &pressTime2); // left footswitch returns 'u' for short, 'j' for long press
  checkButton(button3, 'i', 'k', &pressTime4); // centre footswitch returns 'i' for short, 'k' for long press
  checkButton(button4, 'o', 'l', &pressTime3); // right footswitch returns 'o' for short, 'l' for long press
}

void checkButton(int buttonPin, char shortPressKey, char longPressKey, unsigned long *pressTime) {
  if (digitalRead(buttonPin) == LOW) { // Button is pressed
    if (*pressTime == 0) { // Start of new press
      *pressTime = millis();
    }
  } else {
    if (*pressTime != 0) {
      if (millis() - *pressTime > longPressThreshold) {
        // It's a long press
        Keyboard.press(longPressKey);
        Keyboard.release(longPressKey);
      } else {
        // It's a short press
        Keyboard.press(shortPressKey);
        Keyboard.release(shortPressKey);
      }
      *pressTime = 0; // Reset press time
    }
  }
  delay(20);
}
