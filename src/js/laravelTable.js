
var LaravelTable = function() {

    /**
     * important
     */

    this.targetId = '';

    this.sourceUrl = '';

    this.token = '';

    /**
     * other configs
     */

    this.actionColumnEnabled = false;

    /**
     * html configs, defaults
     */

    this.tableDivWrapper = '<div>';

    this.tableOpTag = "<table>";

    this.tableHeaderOpTag = "<thead>";

    this.tableHeaderTrOpTag = "<tr>";

    this.tableHeaderTdOpTag = "<th>";

    this.tableBodyOpTag = "<tbody>";

    this.tableBodyTrOpTag = "<tr>";

    this.tableBodyTdOpTag = "<td>";

    this.actionColumnEditUrl = window.location.href + '/{id}/edit'; // {id} is required

    this.actionColumnDeleteUrl =  window.location.href + '/{id}/delete'; // {id} is required

    /**
     * data container
     */

    this.laravelData = {};

    /**
     * lets go
     */

    this.init = function() {
        this.ready();
    }; // init()

    this.ready = function() {

        var _this = this;


        let paginationClickCB = function() {

            var classname = document.getElementsByClassName("page-link");

            var myFunction = function(e) {
                e.preventDefault();
                _this.sourceUrl = this.getAttribute("href");
                _this.generateTable(paginationClickCB);
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', myFunction, false);
            }

        };

        this.generateTable(paginationClickCB);

    }; // ready()

    this.generateTable = function(cb) {

        fetch(this.sourceUrl, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                     "Accept": "application/json, text-plain, */*",
                     "X-CSRF-TOKEN": this.token,
                     'Access-Control-Allow-Origin':'*'
                },
                method: 'get',
                mode: 'no-cors'
            })
            .then(res => {
                return res.json();
            })
            .then(data => {

                this.laravelData = data;

                let validData = this.checkLaravelData();

                if (validData) {
                    this.constructTable();

                    if (typeof cb === 'function')
                        cb();

                } else {
                    this.messageUser('Invalid data from source!', 'error');
                }

            })
            .catch(err => {
                console.log(err);
            });

    }; // generateTable()

    this.checkLaravelData = function() {

        let indexes = [
            'current_page',
            'data',
            'first_page_url',
            'from',
            'last_page',
            'last_page_url',
            'next_page_url',
            'path',
            'per_page',
            'prev_page',
            'prev_page_url',
            'to',
            'total',
        ];

        let valid = true;

        let data = this.laravelData;

        for (let i in data) {
            if (!indexes.includes(i)) {
                valid = false;
                break;
            }
        }

        return valid;
    }; // checkLaravelData()

    this.constructTable = function() {

        if ( this.laravelData.data.length < 1 )
            return;

        let html = this.tableDivWrapper + this.tableOpTag;

        html += this.generateTableHeader();

        html += this.generateTableBody();

        html += '</table>';

        html += this.generatePagination();

        html += '</div>';

        var elem = document.getElementById(this.targetId);

        elem.innerHTML = html;

    }; // constructTable()

    this.generateTableHeader = function(data) {

        let _this = this;

        let html = this.tableHeaderOpTag + this.tableHeaderTrOpTag;

        var data = this.laravelData.data;

        for (var i = 1, len = data.length; i < len; i++) {

            for (let index in data[i])
                html += _this.tableHeaderTdOpTag + index.replace(/./,index=>index.toUpperCase()).replace(/_/, ' ') + '</th>';

            break;
        };

        if ( this.actionColumnEnabled )
            html += this.tableHeaderTdOpTag + 'Action</th>';

        html += '</tr></thead>';

        return html;

    }; // generateTableHeader()

    this.generateTableBody = function(data) {

        let _this = this;

        let html = this.tableBodyOpTag;

        var data = this.laravelData.data;

        for (var i = 0, len = data.length; i < len; i++) {

            html += this.tableBodyTrOpTag;

            for (let index in data[i])
                html += _this.tableBodyTdOpTag + data[i][index] + '</td>';

                if ( this.actionColumnEnabled ) {
                    html += this.tableBodyTdOpTag +
                        '<a href="'+ this.actionColumnEditUrl.replace('{id}', data[i].id) +'" class="btn btn-success">Edit</a>&nbsp;' +
                        '<a href="'+ this.actionColumnDeleteUrl.replace('{id}', data[i].id) +'" class="btn btn-danger">Delete</a>' +
                    '</td>';
                }

            html += '</tr>';
        };

        html += '</tbody>';

        return html;

    }; // generateTableHeader()

    this.generatePagination = function() {

        let current_page = this.laravelData.current_page,
            first_page_url = this.laravelData.first_page_url,
            last_page = this.laravelData.last_page,
            last_page_url = this.laravelData.last_page_url,
            next_page_url = this.laravelData.next_page_url,
            path = this.laravelData.path,
            prev_page_url = this.laravelData.prev_page_url
        ;

        let html = '<ul role="navigation" class="pagination" id="laravelTablePagination">';

            html += '<li  class="page-item '+ (current_page == 1 ? 'disabled' : '') + '">' +
            (current_page == 1 ? '<span class="page-link">First</span>' : '<a href="'+ first_page_url +'" rel="next" class="page-link">First</a>') +
        '</li>';

        html += '<li class="page-item '+ (current_page == 1 ? 'disabled' : '') + '">' +
                (current_page == 1 ? '<span class="page-link">Previous</span>' : '<a href="'+ prev_page_url +'" rel="next" class="page-link">Previous</a>') +
        '</li>';

        for (var i = 1, len = last_page; i <= len; i++) {
            html += '<li class="page-item '+ (current_page == i ? 'active' : '') +'">' +
                 (current_page == i ? '<span class="page-link">'+ i +'</span>' : '<a href="'+ path +'?page='+ i +'" class="page-link">'+ i +'</a>') +
             '</li>';
        }

        html += '<li class="page-item '+ (current_page == last_page ? 'disabled' : '') + '">' +
                (current_page == last_page ? '<span class="page-link">Next</span>' : '<a href="'+ next_page_url +'" rel="next" class="page-link">Next</a>') +
        '</li>';

        html += '<li class="page-item '+ (current_page == last_page ? 'disabled' : '') + '">' +
            (current_page == last_page ? '<span class="page-link">Last</span>' : '<a href="'+ last_page_url +'" rel="next" class="page-link" onclick="event.preventDefault()">Last</a>') +
        '</li>';

        html += '</ul>';

        return html;

    }; // generatePagination()


    this.messageUser = function(msg, type) {

        if (typeof msg === 'undefined')
            return;

        if (typeof type === 'undefined')
            type = 'info';

        switch(type) {
            case 'error':
                try {
                    console.error('Error: ' + msg);
                    throw '';
                } catch (e) {
                    throw 'Error: ' + msg;
                }
                break;
            case 'info':
            default:
                console.log(msg);
                break;
        } // endswitch

    }; // messageUser()

}; // laravelTable
