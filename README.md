# JQuery-Autocomplete
JQuery function to autocomplete a form input field from an array of data objects which can be set in the javascript or gotten via a url

# Usage

There are basically two ways to call the autocomplete on the input field

-	**With Javascript**
````html
<!-- settings are in js -->
<input type="text" id="with-js" />
<!-- called via js but settings in data object -->
<input type="text" id="with-default-js" data-sift-data="true" />
<script>
	var settings = {};
	$('input.with-js').autocomplete(settings);
	$('input.with-default-js').autocomplete();
</script>
````
-	**Without Javascript**
````html
<!-- default settings -->
<input type="text" data-jq-autocomplete />
<!-- custom settings in object -->
<input type="text" data-jq-autocomplete="{sift_data:true}" />
<!-- custom settings with data object -->
<input type="text" data-jq-autocomplete data-sift-data="true" />
````

# Settings

Key|Default|Description
---|-------|-----------
afterListing|function|function to call after data is loaded. Parameters are `ul` and data array where the `this` object is the input element.
beforeListing|function|Function to call before data is loaded. Parameters are `ul`, and data array where the `this` object is the input element
data|empty array|Array of data to autocomplete from
data_key|empty string|Key in the response object containing the data array
delay|300|Time in millisecond before autocomplete kicks in
list|function|Function to load each received data. Parameters are `li` and the data for the row where the `this` object is the input element.
method|get|Request method for ajax request. Url must be set
min_chars|3|Minimum characters before autocomplete kicks in
sift_data|false|Set to `true` if to check data against input string
url|empty string|Path from which to access the data
ul_class|empty string|The class to add to the ul of the displayed list

# Demo
Check the contained demo.html
