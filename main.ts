// Add 10 minutes as countdown each time Button A is pressed
input.onButtonPressed(Button.A, function () {
    // If the countdown has not started, then add 10 minutes once press button A
    if (Start == 0) {
        // Add the target countdown by 10 
        TimerOffLED += 10
        // Show the value of countdown
        basic.showNumber(TimerOffLED)
    }
})
// Initial the pointer of the LED to the last X= 4, Y = 4 which is the last row and column of LED
function InitialLEDLocation () {
    // Set LEDx = 4
    LEDx = 4
    // Set LEDy = 4
    LEDy = 4
}
// To start the countdown once Button B is pressed
input.onButtonPressed(Button.B, function () {
    // If the countdown has not start, then  go ahead start it
    if (Start == 0) {
        // Change the target of LED off in minutes to seconds
        OffLEDPerInterval = TimerOffLED * (mins / 25)
        // Light up all the LEDs
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        // Kick the countdown
        Start = 1
    }
})
// Function for off the LED, once function is called, off the last lit LED. If the last lit LED is at x =0, then off the last lit LED and change the pointer to last lit Y row and last lit LED in X
function RemoveLED () {
    // Turn off the last lit LED if there is row of LED, change the LED pointer to cnrrent last lit LED
    if (LEDx > 0) {
        // Turn off last lit LED in a last row
        led.unplot(LEDx, LEDy)
        // Set the pointer to latest last lit LED
        LEDx = LEDx - 1
    } else {
        // Turn off last lit LED in a last row
        led.unplot(LEDx, LEDy)
        // Reset the value of X to 4 to point to last lit LED
        LEDx = 4
        // Change the value of Y last lit column LED
        LEDy = LEDy - 1
    }
}
// Initialize the parameter and setup
let LEDy = 0
let LEDx = 0
let mins = 0
let OffLEDPerInterval = 0
let TimerOffLED = 0
let Start = 0
// Create the start variable to avoid user repeat pressing
Start = 0
// Create TimerOffLED variable for time setup 
TimerOffLED = 0
// Create Off LED per interval for the average of time required to off one LED
OffLEDPerInterval = 0
// Convert from seconds to minutes
mins = 1000 * 60
// Setup the LED location pointer at LED (4,4)
InitialLEDLocation()
// Show heart shape to tell the system is ready
basic.showIcon(IconNames.Heart)
// Creating forever to keep stayby for initiating the countdown
basic.forever(function () {
    // Once Start = 1 is being called by Button B, then run the countdown LED
    while (Start == 1) {
        // Pause average seconds required set  
        basic.pause(OffLEDPerInterval)
        // Call Remove LED function to off the last light LED
        RemoveLED()
        // Once all the LED is off, then trigger the next steps, blink sad face and trigger sad sound every second
        // Once the lit LEDs light left 3, then trigger the reminder in melody "entertainer"
        if (LEDy < 0) {
            // Show sad face
            basic.showIcon(IconNames.Sad)
            // Play sad sound
            soundExpression.sad.play()
            // Pause one second for better view
            basic.pause(1000)
            // Clear screen for blinking sad sad face 
            basic.clearScreen()
        } else if (LEDx == 2 && LEDy == 0) {
            // Play melody "entertainer" at background for reminder
            music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.OnceInBackground)
        }
    }
})
