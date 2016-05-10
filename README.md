# JQuery-Autocomplete
JQuery function to autocomplete a form input field from an array of data objects which can be set in the javascript or gotten via a url

# Usage
````js
$('input').autocomplete();
````
or

````html
<input type="input" data-jq-autocomplete />
````
# Settings

Key|Default|Description
---|-------|-----------
url|empty string|Path from which to access the data
ul_class|empty string|The class to add to the ul of the displayed list
data|empty array|Array of data to autocomplete from
min_chars|3|Minimum characters before autocomplete kicks in
delay|300|Time in millisecond before autocomplete kicks in
method|get|Request method for ajax request. Url must be set
data_key|empty string|Key in the response object containing the data array
sift_data|false|Set to `true` if to check data against input string
beforeListing|function|Function to call before data is loaded
list|function|Function to load each received data
afterListing|function|function to call after data is loaded

# Demo
Check the contained demo.html