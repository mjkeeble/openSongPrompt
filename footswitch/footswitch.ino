#include <Keyboard.h>
const int jButton = 2;
const int kButton = 3;
const int mButton = 4;

void setup() {
  pinMode(jButton, INPUT);
  pinMode(kButton, INPUT);
  pinMode(mButton, INPUT);

Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
if (digitalRead(jButton))
{
  Keyboard.write('j');
}

if (digitalRead(kButton))
{
  Keyboard.write('k');
}

if (digitalRead(mButton))
{
  Keyboard.write('m');
}

}
