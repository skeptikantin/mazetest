// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)
PennController.DebugOff();


// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence( "intro", "instructions", randomize("training"), "intermission", randomize("experiment") , SendResults() , "goodbye" )


// What is in Header happens at the beginning of every single trial
Header(
    // We will use this global Var element later to store the participant's name
    newVar("ParticipantName")
        .global()
    ,
    // Delay of 250ms before every trial
    newTimer(750)
        .start()
        .wait()
)
.log( "Name" , getVar("ParticipantName") )
// This log command adds a column reporting the participant's name to every line saved to the results


newTrial( "intro" ,

    newText("Welcome to suz’ maze experiment.")
        .css("font-size", "2em")
        .css("font-family", "Comic Sans", "Monaco", "Noto Sans", "Open Sans")
        .center()
        .print()
    ,
    newText("<p>Please enter your name below and press enter:</p>")
        .css("font-size", "1.5em")
        .css("font-family", "Open Sans", "Monaco", "Noto Sans", "Comic Sans")
        .center()
        .print()
    ,
    newTextInput()
        .center()
        .print()
        .wait()                 // The next command won't be executed until Enter is pressed
        .setVar( "ParticipantName" )
        // This setVar command stores the value from the TextInput element into the Var element
) // intro message

newTrial("instructions" ,

    newText("<p>In this experiment, your task is to read sentences word-by-word.<br/>" +
        "To read, you are given two words to choose from, which appear side by side.<br/>" +
        "Only <b>one</b> of the words is a plausible continuation of the sentence.</p>" +
        "<p>Use the <b>left</b> and <b>right</b> arrow keys to make your choice.</p>" +
        "<p>If you choose the wrong word, the sentence aborts and you will be given a new sentence.</p>" +
        "<p><b>Please make your choices as quickly and as accurately as possible.</b></p>" +
        "<p>There will be a few practice sentences to familiarize you with the task.</p>")
        .css("font-size", "1.5em")
        .css("font-family", "Open Sans")
        .center()
        .print()
    ,
    newText("<p>Click OK when you are ready to begin.</p>")
        .css("font-size", "1em")
        .css("font-family", "Open Sans", "Monaco", "Noto Sans", "Comic Sans")
        .center()
        .print()
    ,
    newButton("OK")
        .size(200)
        .center()
        .print()
        .wait()
) // instructions

Template("training.csv", row =>
    newTrial("training",

        newController("Maze", {s: row.Sentence, a: row.Distractor})
            .css("font-size", "1.5em")
            .css("font-family", "Open Sans", "Monaco", "Noto Sans", "Comic Sans")
            .print()
            .log()
            .wait()
            .failure(newText ("oops!")
            .remove()
        ,
        // newTimer(500).start().wait()
    )
) // defines template for the main experiment

newTrial("intermission" ,

    newText("<p>Well done, you should be good to go.<br/>" +
        "Remember: try to be as quick and as accurate as possible.</p>" +
        "<p>The task is fun, but demanding, so you are welcome to take short breaks,<br/>" +
        "but please pause only <b>before</b> choosing the first word of a new sentence.</p>" +
        "Thanks!")
        .css("font-size", "1.5em")
        .css("font-family", "Open Sans", "Monaco", "Noto Sans", "Comic Sans")
        .center()
        .print()
    ,
    newText("<p>Click OK when you are ready to proceed to the main experiment.</p>")
        .css("font-size", "1em")
        .css("font-family", "Open Sans")
        .center()
        .print()
    ,
    newButton("OK")
        .size(200)
        .center()
        .print()
        .wait()
) // instructions

Template("sentences.csv", row =>
    newTrial("experiment",

        newController("Maze", {s: row.Sentence, a: row.Distractor})
            .css("font-size", "1.5em")
            .css("font-family", "Open Sans")
            .print()
            .log()
            .wait()
            .remove()
        ,
        newTimer(500)
            .start()
            .wait()
    )
        // logs additional variables in sentence file (e.g., Fun)
        .log("Fun", row.Fun)
        .log("Index", row.Index)
        .log("Type", row.Type)
) // defines template for the main experiment

SendResults("send") // send results to server before good-bye message

newTrial("goodbye",
    newText("<p>Thank you very much for your time and effort!</p>")
        .css("font-size", "1.5em")
        .css("font-family", "Open Sans")
        .center()
        .print()
    ,
    newText("<a href='https://www.sfla.ch/'>Click here to validate your participation.</a>")
        .css("font-size", "1em")
        .css("font-family", "Open Sans")
        .center()
        .print()
    ,
    newButton("void")
        .wait()
) // the good-bye message

.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial
