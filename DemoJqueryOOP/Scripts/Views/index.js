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

    //loadData using Ajax Call from server
    //Get from API call
    //Created by NBDUONG (18/4/2019)
    //Modified by NBDUONG (19/4/2019): Ajax Call to get data from server is shown in function getDataFromServer(), function loadData() works only to show data, no ajax 
    loadData() {
        $.each(dataInServer, function (index, item) {
            var rowHtml = $('<tr></tr>');
            if (index % 2 === 1) {
                rowHtml = $('<tr class="row-even"></tr>');
            }

            var listElements = $('div[fieldData]');

            $.each(listElements, function (i, element) {
                var fieldData = $(element).attr("fieldData");
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
    };

    //Function get data from server through ajax call
    // Created by NBDUONG (19/4/2019)
    getDataFromServer() {
        var data = [];
        var elements = {};
        $.ajax({
            type: "GET",
            url: "/customers",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    //each element is displayed as an array when parse data from json
                    //each element contains fields like in Customer Entity
                    elements = {
                        CustomerCode: response[i].CustomerCode,
                        CustomerName: response[i].CustomerName,
                        GenderName: response[i].GenderName,
                        Birthday: new Date(response[i].Birthday).toLocaleDateString(),
                        Salary: response[i].Salary,
                        Address: response[i].Address,
                        StopFollow: response[i].StopFollow
                    };

                    //push elements into data array
                    data.push(elements);
                }

                //assign data taken from server into object dataInServer to get data from server everywhere in this js file
                dataInServer = data;
                customerJSNew.loadData();
            }, error: function () {
                alert("FAIL");
            }
        });
    }
}

var check ;

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

    //Add function
    // Created by NBDUONG (18/4/2019)
    add() {
        //3 buttons in the bottom of the dialog
        var buttons = {
            "Lưu": check.save,
            "Đóng": function () { popup.closeDialog(); },
            "Giúp": function () { }
        };

        //new Dialog with id = "formDetail", width: 700, height: 270, buttons are shown below and header: "Thêm mới nhân viên"
        var popup = new Dialog('#formDetail', 700, 270, buttons, "Thêm mới nhân viên");
        popup.openDialog();

        popup.addDatePicker("#birthday-selection");
        popup.getSelectMenu("#follow-ComboBox");
        popup.getSelectMenu("#gender-ComboBox");
    }

    //Edit function
    // Created by NBDUONG (18/4/2019)
    edit() {
        var buttons = {
            "Lưu": function () { validate.validateInput(); },
            "Đóng": function () { popup.closeDialog(); },
            "Giúp": function () { }
        }
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
        }
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
        var object = {
            CustomerName: $('#input-name').val(),
            CustomerCode: $('#input-code').val(),
            Address: $('#input-address').val(),
            Birthday: $('#birthday-selection').val(),
            Salary: $('#input-salary').val(),
            Gender: $('#gender-ComboBox').val(),
            StopFollow: $('#follow-ComboBox').val()
        };

        //ajax call api to create new customer
        //Created By: NBDUONG (19/4/2019)
        if (object.CustomerName !== "" && object.CustomerCode !== "") {
            $.ajax({
                type: "POST",
                url: "/customers/new",
                data: JSON.stringify(object),
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function () {
                    this.loadData();
                    popup.closeDialog();
                },
                error: function () {
                    console.log("gege");
                }
            });
        } else {
            alert("thieu du lieu ko cho insert");
        }    
    }
}
