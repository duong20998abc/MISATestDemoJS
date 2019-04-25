var dataInServer;

//Run JS when all is loaded
//Created by NBDUONG (18/4/2019)
$(document).ready(function () {
    //Create new CustomerJS object
    // Created by NBDUONG (18/4/2019)
    customerJSNew = new CustomerJS();

    //Create new Validate Object
    //Created by NBDUONG (18/4/2019)
    validate = new Validate();

});

// Class Base for inheritance
// Created by NBDUONG (18/4/2019)
class Base {
    //Constructor
    // Created by NBDUONG (18/4/2019)
    constructor() {

    }

    //Function get data from server through ajax call
    // Created by NBDUONG (19/4/2019)
    getDataFromServer() {
        $('.loading').show();
        var data = [];
        var elements = {};
        $.ajax({
            type: "GET",
            url: "/customers",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                //var data = response.Data;
                for (var i = 0; i < response.Data.length; i++) {
                    //each element is displayed as an array when parse data from json
                    //each element contains fields like in Customer Entity

                    elements = {
                        CustomerId: response.Data[i].CustomerID,
                        CustomerCode: response.Data[i].CustomerCode,
                        CustomerName: response.Data[i].CustomerName,
                        GenderName: response.Data[i].GenderName,
                        Birthday: new Date(response.Data[i].Birthday).toLocaleDateString(),
                        Salary: response.Data[i].Salary,
                        Address: response.Data[i].Address,
                        StopFollow: response.Data[i].StopFollow
                    };

                    //push elements into data array
                    data.push(elements);
                }

                //assign data taken from server into object dataInServer to get data from server everywhere in this js file
                dataInServer = data;
            }, error: function () {
                alert("FAIL");
            }
        });
    }


    //loadData using Ajax Call from server
    //Get from API call
    //Created by NBDUONG (18/4/2019)
    //Modified by NBDUONG (19/4/2019): Ajax Call to get data from server is shown in function getDataFromServer(), function loadData() works only to show data, no ajax 
    loadData() {
        $('.loading').hide();
        $.each(dataInServer, function (index, item) {
            var rowHtml = $('<tr></tr>');
            if (index % 2 === 1) {
                rowHtml = $('<tr class="row-even"></tr>');
            }

            rowHtml.data(item);

            var listElements = $('div[fieldData]');

            //Check format data
            //Modified by NBDUONG (25/4/2019)
            $.each(listElements, function (i, element) {
                var fieldData = $(element).attr("fieldData");
                var dataType = $(element).attr('dataType');
                var value = item[fieldData] ? item[fieldData] : ""; //check null
                var typeData = jQuery.type(value);
                switch (dataType) {
                    case "date":
                        var dateString = "";    
                        if (value) {
                            value = new Date(value);
                            dateString = value.formatddMMyyyy();
                        }
                        rowHtml.append('<td class = "align-center">' + dateString + '</td>');
                        break;
                    case "money":
                        var money = "";
                        if (value) {
                            money = value.formatMoney();
                        }
                        rowHtml.append('<td class = "align-right">' + money + '</td>');
                        break;
                    case "boolean":
                        var checkbox = "";
                        if (value) {
                            checkbox = '<input type ="checkbox" checked />';
                        } else {
                            checkbox = '<input type = "checkbox"';
                        }

                        rowHtml.append('<td class = "align-center">' + checkbox + '</td>');
                        break;

                    default: 
                        rowHtml = $(rowHtml).append('<td>' + value + '</td>');
                }
            });

            $('tbody').append(rowHtml);
        });
    }
}

var check;

//CustomerJS class inherited from Base and using method of parents
// Created by NBDUONG (18/4/2019)
class CustomerJS extends Base {

    //constructor
    //Created By NBDUONG (18/4/2019)
    constructor() {
        super();
        this.initEvents();
        this.getDataFromServer();
        this.loadData();
        this.CustomerName = "Dương";
        this.onRowClick();
        this.dialog = new Dialog('#formDetail', 700, 270, this);
        check = this;
        check.dialog.addDatePicker("#Birthday");
        check.dialog.getSelectMenu("#StopFollow");
        check.dialog.getSelectMenu("#Gender");
    }

    //initEvents
    // Created By NBDUONG (18/4/2019)
    initEvents() {
        $('#btnAdd').click(this.add);
        $('#btnEdit').click(this.edit);
        $('#btnView').click(this.view);
        $('#btnRefresh').click(this.refresh);
        $('#btnDuplicate').click(this.duplicate);
        $('#btnDelete').click(this.delete);
    }

    //function run when click a row in table
    // Created By NBDUONG (25/4/2019)
    onRowClick() {
        $('tbody').on('click', 'tr', function () {
            $('tbody tr').removeClass('selected-row');
            $(this).addClass('selected-row');
        });
    }

    //Add function
    // Created by NBDUONG (18/4/2019)
    add() {
        $('span#ui-id-1').text("Thêm mới khách hàng");
        //3 buttons in the bottom of the dialog
        check.dialog.openDialog();
    }

    //Edit function
    // Created by NBDUONG (18/4/2019)
    edit() {
        if ($('.selected-row').data()) {
            $('span#ui-id-1').text("Chỉnh sửa khách hàng");
            check.dialog.openDialog();
            check.dialog.addDatePicker("#birthday-selection");
            check.dialog.getSelectMenu("#follow-ComboBox");
            check.dialog.getSelectMenu("#gender-ComboBox");

            var customer = $('.selected-row').data();
            console.log(customer);

            var listElements = $('[dataIndex]');
            $.each(listElements, function (index, item) {
                var fieldData = $(item).attr('dataIndex');
                var fieldValue = customer[fieldData];
                switch (fieldData) {
                    case "Birthday":
                        fieldValue = new Date(fieldValue).formatddMMyyyy();
                        $(item).val(fieldValue);
                        break;
                    case "Gender":
                        $(item).val(fieldValue);
                        $('#Gender').selectmenu("refresh");
                        break;
                    case "StopFollow":
                        $(item).val(fieldValue);
                        $("#StopFollow").selectmenu("refresh", false);
                        break;
                    default:
                        $(item).val(fieldValue);
                        break;
                }
            });

        } else {
            alert('Vui lòng chọn 1 dòng');
        }
    }

    //View function
    // Created by NBDUONG (18/4/2019)
    view() {
        $('span#ui-id-1').text("Xem khách hàng");
        check.dialog.openDialog();
        check.dialog.addDatePicker("#birthday-selection");
        check.dialog.getSelectMenu("#follow-ComboBox");
        check.dialog.getSelectMenu("#gender-ComboBox");
    }

    //Refresh function
    // Created by NBDUONG (18/4/2019)
    refresh() {
        $('span#ui-id-1').text("Refresh khách hàng");
        check.dialog.openDialog();
        check.dialog.addDatePicker("#birthday-selection");
        check.dialog.getSelectMenu("#follow-ComboBox");
        check.dialog.getSelectMenu("#gender-ComboBox");
    }

    //Duplicate function
    // Created by NBDUONG (18/4/2019)
    duplicate() {
        $('span#ui-id-1').text("Nhân bản khách hàng");
        check.dialog.openDialog();
        check.dialog.addDatePicker("#birthday-selection");
        check.dialog.getSelectMenu("#follow-ComboBox");
        check.dialog.getSelectMenu("#gender-ComboBox");
    }

    //Delete customer function
    // Created by NBDUONG (18/4/2019)
    delete() {
        var customer = $('.selected-row') ? $('.selected-row').data() : null;
        var customerId = customer.CustomerId;
        $.ajax({
            type: "POST",
            url: "/customers/delete/" + customerId,
            success: function () {
                alert("Success");
                location.reload();
            },
            error: function () {
                alert("Noob");
            }
        });
    }

    save() {
        //Validate data
        //Created By NBDUONG (18/4/2019)

        if (validate.validateInput()) {
            var elements = $('#formDetail input, #formDetail select');
            var object = {};

            //Format Date String to Synch Date Data in DB vs Date Data get from Server
            //Modified By NBDUONG (23/4/2019)
            $.each(elements, function (index, element) {
                var id = $(element).attr('id');
                if (id === "StopFollow") {
                    //customer[id] = $(`#${idname}`).prop('checked');  //new world
                    object[id] = parseInt($(element).val());
                } else if (id === "Birthday") {
                    var datePicker = $('#Birthday').datepicker('getDate');
                    var dateObject = $.datepicker.formatDate("yy-mm-dd", datePicker);
                    object[id] = dateObject + " 00:00:00";
                }
                else {
                    object[id] = $(element).val();
                }
            });

            console.log(object);

            //ajax call api to create new customer
            //Created By: NBDUONG (19/4/2019)
            $.ajax({
                type: "POST",
                url: "/customers/new",
                data: JSON.stringify(object),
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (object) {
                    location.reload();
                },
                error: function () {
                    console.log("gege");
                }
            });
        } else {
            alert("Vui lòng điền đầy đủ dữ liệu");
        } 
    }
}


