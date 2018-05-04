'use strict';

(function(){
    var _ = require('underscore');
    var fs = require('fs');

    var TAB = "\t";
    var NEW_LINE = "\n";

    var ARG_INPUT = "-i";
    var ARG_OUTPUT = "-o";
    var ARG_VERBOSE = "-v";

    var DEFAULT_OUTPUT_FILE = "tmp/test.txt";

    // Validate the Number of Arguments
    if(!validateArgs()){
        return;
    }

    // Loads the Arguments and Validates that there is an Input File argument
    var args = loadArgsObject();
    if(!args.inputFile){
        console.log("Error: No input file provided. Please provide an input file by using the -i flag and specifying the relative path of the file you'd like to use.");
        return;
    }

    // Validates that the Input File Exists
    if(!fs.existsSync(args.inputFile)) {
        console.log('Error: Input file does not exist: ' + args.inputFile);
        return;
    }

    console.log("Attempting to parse file for json data: " + args.inputFile);

    var content = loadFile(args.inputFile);

    console.log('Formatting contents...');

    var output = formatText(content);

    console.log('Writing to output file: ' + args.outputFile);

    writeOutput(args.outputFile, output);

    console.log('File Written. End of program.');

    function loadFile(inputFile){
        return fs.readFileSync(inputFile).toString();
    }

    function formatText(str){
        return str.replace(/\r?\n|\r/g, '')
            .replace(/Object\({/g, '({' + NEW_LINE + TAB)   // Normalize Object Declarations
            .replace(/(}\),?)/g, '$1' + NEW_LINE + TAB)
            .replace(/\[/g, '[' + NEW_LINE + TAB)       // Format Square Brackets
            .replace(/]/g, NEW_LINE + ']')
            .replace(/\({/g, '{' + NEW_LINE + TAB)       // Format Curly Braces
            .replace(/}\)/g, NEW_LINE + '}');
    }

    function writeOutput(path, str){
        var file = fs.createWriteStream(path);
        file.on('error', function(err){
            console.log(err);
        });

        file.write(str);

        file.end();
    }

    function validateArgs(){
        if(process.argv.length < 3){
            console.log("No arguments provided. Please provide the relative path of the file you would like to convert.");
            return false;
        }

        return true;
    }

    function loadArgsObject(){
        var args = _.rest(process.argv, 2);
        var output = {};

        for(var i = 0; i < args.length; i += 2){
            switch(args[i]){
                case ARG_INPUT:
                    output.inputFile = args[i + 1];
                    break;
                case ARG_OUTPUT:
                    output.outputFile = args[i + 1];
                    break;
                case ARG_VERBOSE:
                    output.isVerbose = true;
                    i--;
                    break;
                default:
                    console.log('Invalid Argument Detected: ' + args[i]);
                    break;
            }
        }

        if(!output.outputFile){
            output.outputFile = DEFAULT_OUTPUT_FILE;
        }

        return output;
    }
})();

