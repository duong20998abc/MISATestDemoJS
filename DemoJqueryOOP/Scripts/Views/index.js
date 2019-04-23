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
                for (var i = 0; i < response.Data.length; i++) {
                    //each element is displayed as an array when parse data from json
                    //each element contains fields like in Customer Entity
                    
                    elements = {
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

            var listElements = $('div[fieldData]');

            $.each(listElements, function (i, element) {
                var fieldData = $(element).attr("fieldData");
                var fieldValue = element[fieldData];
                var dataType = typeof (fieldValue);


                if (fieldData === "StopFollow" && item[fieldData]) {
                    rowHtml.append('<td><input type="checkbox" checked /></td>');
                } else if (fieldData === "StopFollow" && !item[fieldData]) {
                    rowHtml.append('<td><input type="checkbox" /></td>');
                } else {
                    rowHtml.append('<td>' + item[fieldData] + '</td>');
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
        this.getDataFromServer();
        this.loadData();
        this.CustomerName = "Dương";
        this.initEvents();
        check = this;
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

    onRowClick() {
        $('tbody').on('click', 'tr', function () {

        });
    }

    //Add function
    // Created by NBDUONG (18/4/2019)
    add() {
        //3 buttons in the bottom of the dialog
        var buttons = {
            "Lưu": function () {
                check.save();
                popup.closeDialog();
            },
            "Đóng": function () { popup.closeDialog(); },
            "Giúp": function () { }
        };

        //new Dialog with id = "formDetail", width: 700, height: 270, buttons are shown below and header: "Thêm mới nhân viên"
        var popup = new Dialog('#formDetail', 700, 270, buttons, "Thêm mới nhân viên");
        popup.openDialog();

        popup.addDatePicker("#Birthday");
        popup.getSelectMenu("#StopFollow");
        popup.getSelectMenu("#Gender");
    }

    //Edit function
    // Created by NBDUONG (18/4/2019)
    edit() {
        var buttons = {
            "Lưu": function () { validate.validateInput(); },
            "Đóng": function () { popup.closeDialog(); },
            "Giúp": function () { }
        };
        var popup = new Dialog('#formDetail', 700, 270, buttons, "Chỉnh sửa thông tin nhân viên");
        popup.openDialog();

        popup.addDatePicker("#birthday-selection");
        popup.getSelectMenu("#follow-ComboBox");
        popup.getSelectMenu("#gender-ComboBox");
    }

    //View function
    // Created by NBDUONG (18/4/2019)
    view() {
        var buttons = {
            "Đóng": function () { popup.closeDialog(); },
            "Giúp": function () { }
        };
        var popup = new Dialog('#formDetail', 700, 270, buttons, "Xem thông tin nhân viên");
        popup.openDialog();

        popup.addDatePicker("#birthday-selection");
        popup.getSelectMenu("#follow-ComboBox");
        popup.getSelectMenu("#gender-ComboBox");
    }

    //Refresh function
    // Created by NBDUONG (18/4/2019)
    refresh() {
        var buttons = {
            "Nạp": function () { },
            "Đóng": function () { popup.closeDialog(); },
            "Giúp": function () { }
        };
        var popup = new Dialog('#formDetail', 700, 270, buttons, "Nạp dữ liệu nhân viên");
        popup.openDialog();

        popup.addDatePicker("#birthday-selection");
        popup.getSelectMenu("#follow-ComboBox");
        popup.getSelectMenu("#gender-ComboBox");
    }

    //Duplicate function
    // Created by NBDUONG (18/4/2019)
    duplicate() {
        var buttons = {
            "Nhân bản": function () { validate.validateInput(); },
            "Đóng": function () { popup.closeDialog(); },
            "Giúp": function () { }
        };
        var popup = new Dialog('#formDetail', 700, 270, buttons, "Nhân bản");
        popup.openDialog();

        popup.addDatePicker("#birthday-selection");
        popup.getSelectMenu("#follow-ComboBox");
        popup.getSelectMenu("#gender-ComboBox");
    }

    //Delete function
    // Created by NBDUONG (18/4/2019)
    delete() {
        var buttons = {
            "Xóa": function () { },
            "Đóng": function () { popup.closeDialog(); },
            "Giúp": function () { }
        };
        var popup = new Dialog('#formDetail', 700, 270, buttons, "Xóa nhân viên");
        popup.openDialog();

        popup.addDatePicker("#birthday-selection");
        popup.getSelectMenu("#follow-ComboBox");
        popup.getSelectMenu("#gender-ComboBox");
    }

    save() {
        //Validate data
        //Created By NBDUONG (18/4/2019)
        validate.validateInput();

        //Created By NBDUONG (18/4/2019)
        //Get data from form, build into object

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
    }
}


