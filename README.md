# Jasmine Assertion Log Fixer

# Description
This is a simple utility written in Node.js which converts the output of a failed Jasmine assertion to a format more
conducive to line by line comparison.

# Usage
Note: On first time use, make sure to run `npm install` from the main directory of the project, in order to load the
required node modules.

## Basic Usage
`node src/js/convert.js -i /relative/path/to/input-file.csv`
## Specify Output File
`node src/js/convert.js -i /relative/path/to/input-file.csv -o /relative/path/to/output-file.txt`
## Specify Verbose mode
`node src/js/convert.js -i /relative/path/to/input-file.csv -v`

# Arguments

* -i = Relative path of the input file to be read (required).
* -o = Relative path of the output file to be written to (optional, default is output/test.txt).
* -v = Indicates to run the script in verbose mode. Displays more information about the script as it runs.

# Sample

## Sample Input
*test/sample-input.txt*
```
Object({ "test-arr": [], "test-object": Object({ "test": Object({})}), "test-value": "test", "test-object-2": Object({}) })
```

## Sample Command
`node src/js/convert.js -i test/sample-input.txt -o tmp/sample-output.txt`

## Sample Output
*tmp/sample-output.txt*
```
{

	 "test-arr": [

], "test-object": {

	 "test": {


}

},
	 "test-value": "test", "test-object-2": {


}

}

```

Please note that the sample output can be easily copied and then pasted into a JSON Formatting app (many are available
online such as this one: [this one](http://json.parser.online.fr/)) to display the data in a readable format.
