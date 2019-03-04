
# laravel-table
All JS inspired Laravel table rendering from Laravel pagination.
Though the action buttons classes for each row was from twitter bootstrap btn-success (edit) and btn-danger (delete) will updated them when I have the time.

## Installation
Install this like the usual, I suggest after the footer

    <script src="laravel-table.js></script>

## Set up

Below is a minimum set up

    <script>
        # start 
        let  laravelTable = new  LaravelTable();
    
        # set the url where you get the pagination
        # the response should be in json
        laravelTable.sourceUrl = '<url where you get the laravel with pagination>';
    
        # set the token
        laravelTable.token = '<site token>';
    
        # the target container id that the laravel table will appear
        laravelTable.targetId = 'laravelTable';
    
        # initialize the class
        # let's go
        laravelTable.init();
    </script>

## Other set up configs

Here are the other list of configs that can be changed. You can change the default tags as you want. 

Ex: 

    laravelTable.tableOpTag = '<table class="table table-hover">';

### Other configs


    # if you want the action column enable, set this true
    # the action column is on the last column in the right
    laravelTable.actionColumnEnabled = true;

	# the div wrapper below the table, by default
	laravelTable.tableDivWrapper = '<div>';

    # the opening table tag, by default
    laravelTable.tableOpTag = '<table>';
    
    # the opening thead tag, by default
    laravelTable.tableHeaderOpTag = "<thead>";
    
    # the opening header tr tag, by default
    laravelTable.tableHeaderTrOpTag = "<tr>";
    
    # the opening header td tag, by default
    laravelTable.tableHeaderTdOpTag = "<th>";
    
    # the opening tbody tag, by default
    laravelTable.tableBodyOpTag = "<tbody>";
    
    # the opening tbody tr tag, by default
    laravelTable.tableBodyTrOpTag = "<tr>";
    
    # the opening tbody td tag, by default
    laravelTable.tableBodyTdOpTag = "<td>";
    
    # if the actionColumnEnabled is true
    # this is the url pointing to the EDIT page
    # {id} is required 
    # ex: yoursite.com/123/edit
    laravelTable.actionColumnEditUrl = window.location.href + '/{id}/edit'; // {id} is required
    
    # if the actionColumnEnabled is true
    # this is the url pointing to the DELETE page/url
    # {id} is required 
    # ex: yoursite.com/123/delete
    laravelTable.actionColumnDeleteUrl = window.location.href + '/{id}/delete'; // {id} is required
	
## Future work

 - Add configs for the action button
 - Add loading icon when table is rendering
 - VueJS implementation
 - Angular implementation
 - ReactJS implementation

## Recommendations
Please feel free to contact me for recommendations, improvements, feedbacks or any violent reactions.

## License
The MIT License (MIT)

Copyright (c) 2019 Devmod IT Solutions <contact@devmod.tech> (https://devmod.tech)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
