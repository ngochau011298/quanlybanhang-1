﻿var listSelected = [];
function PageLoad() {
    var tempListSelected = [];
    
    var TotalPrice = 0;
    registerEvent(tempListSelected, listSelected, TotalPrice);
}
function keyispressed(e) {
    var charval = String.fromCharCode(e.keyCode);
    if ((isNaN(charval)) && (e.which != 8)) { // BSP KB code is 8
        e.preventDefault();
    }
    return true;
}
function registerEvent(tempListSelected, listSelected, TotalPrice) {
    

    $('body').on('change', '#chkSelected', function () {
        if ($(this).is(":checked")) {
            Product = new Object();
            Product.TBId = $(this).val();
            Product.ProductName = $(this).parent('td').parent('tr').find('td:eq(1)').text();
            Product.Price = $(this).parent('td').parent('tr').find('td:eq(3)').text();
            Product.Qty = $(this).parent('td').parent('tr').find('td:eq(4)').text();
            Product.SelectedQty = 1;
            tempListSelected.push(Product);
        }
        else {
            index = tempListSelected.findIndex(x => x.TBId == $(this).val());
            tempListSelected.splice(index, 1);
        }
    })
    $("[type='number']").keypress(function (evt) {
        evt.preventDefault();
    });
    $('body').on('click', '#btnAddnewKH', function () {
        $('#LapHoaDon').modal('hide');
        $('#modal-add-KH').modal('show');

    });

    $('body').on('click', '#btnSelect', function () {
        var render = '';
        $.each(tempListSelected, function (i, item) {
            listSelected.push(item);
            render += '<tr value="'+ item.TBId +'">' +
                '<td>' + item.ProductName + '</td>' +
                '<td><input type="number" class="form-control" value="1" min="1" max="'+item.Qty+'" id="txtQty" /></td>' +
                '<td value="' + item.Price + '">' + item.Price + '</td>' +
                '<td id="btnDelRow"><a><i class="fa fa-trash"></i></a></td>' +
                '</tr>';
            TotalPrice += parseInt(item.Price);
        })
        $('#tblSelectedProduct').append(render);
        $('#tblProduct > tbody > tr').each(function (i, item) {
            var thisId = $(this).find('td:eq(0)>input').attr('value');
            var pos = tempListSelected.map(function (e) { return e.TBId; }).indexOf(thisId);
            if (pos >= 0) {
                $(this).find('td:eq(0)>input').attr("disabled", true);
            }
        })
        $('#frmProduct').trigger('reset');
        tempListSelected = [];
        $('#lblTotalPrice').text(TotalPrice);
    })

    $('body').on('click', '#btnDelRow', function () {
        var thisObj = $(this);
        var id = thisObj.parent('tr').attr('value');
        thisObj.parent('tr').remove();
        TotalPrice = TotalPrice - parseInt($(this).parent('tr').find('td:eq(2)').text());
        $('#lblTotalPrice').text(TotalPrice);
        $('#tblProduct > tbody > tr').each(function (i, item) {
            if ($(this).find('td:eq(0)>input').attr('value') == id) {
                $(this).find('td:eq(0)>input').attr("disabled", false);
            }
        })
        index = listSelected.findIndex(x => x.TBId == id);
        listSelected.splice(index, 1);
    })

    $('body').on('change', '#txtQty', function () {
        var thisObj = $(this);
        var qty = thisObj.val();
        var price = thisObj.parent('td').parent('tr').find('td:eq(2)').attr('value');
        var id = thisObj.parent('td').parent('tr').attr('value');
        TotalPrice = TotalPrice - parseInt($(this).parent('td').parent('tr').find('td:eq(2)').text());
        $(this).parent('td').parent('tr').find('td:eq(2)').text(qty * price);
        TotalPrice = TotalPrice + qty * price;
        index = listSelected.findIndex(x => x.TBId == id);
        listSelected[index].SelectedQty = qty;
        $('#lblTotalPrice').text(TotalPrice);
    })


    /*
    $('body').on('click', '#btnLapHoaDon', function () {
        $('#MainContent_tblSlc > tbody').empty();
        render = "";
        render += '<tr>' +
            '<th colspan="4">Các sản phẩm đã chọn</th>' +
            '</tr>' +
            '<tr>' +
            '<th>STT</th><th>Tên sản phẩm</th><th>Số lượng</th><th>Thành tiền</th>' +
            '</tr>';
        $.each(listSelected, function (i, item) {
            render += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + item.ProductName + '</td>' +
                '<td>' + item.SelectedQty + '</td>' +
                '<td>' + item.SelectedQty * item.Price + '</td>' +
                '</tr>';
        })
        render += '<tr>' +
            '<td colspan="4" value="'+ TotalPrice +'"><h4>Tổng tiền: ' + TotalPrice + '</h4></td>' +
            '</tr>';
        //$('#MainContent_tblSlc > tbody').append(render);
        $(render).appendTo($('#MainContent_tblSlc > tbody'))
    })
    */
    $(document).ready(function () {
        function getSelected() {
            $('#tblSelectedProducts').empty();
            render = "";
            /*
            render += '<tr>' +
                '<th colspan="4">Các sản phẩm đã chọn</th>' +
                '</tr>' +
                '<tr>' +
                '<th>STT</th><th>Tên sản phẩm</th><th>Số lượng</th><th>Thành tiền</th>' +
                '</tr>';
            */
            $.each(listSelected, function (i, item) {
                render += '<tr value="' + item.TBId + '">' +
                    '<td>' + (i + 1) + '</td>' +
                    '<td>' + item.ProductName + '</td>' +
                    '<td>' + item.SelectedQty + '</td>' +
                    '<td>' + item.SelectedQty * item.Price + '</td>' +
                    '</tr>';
            })
            render += '<tr>' +
                '<td colspan="4"><h4>Tổng tiền:</h4><input type="text" id="txtTotalPrice" readonly value="'+ TotalPrice +'" runat"server"></td>' +
                '</tr>';
            $(render).appendTo($('#tblSelectedProducts'))
        }
        $('#btnLapHoaDon').click(getSelected);
    })
    /*
    $(document).ready(function () {
        $('#MainContent_btnFindKH').click(function () {
            return false;
        });
    });
    */
    /*
    $('body').on('click', '#btnLapHoaDon', function () {
        $('#MainContent_btnFindKH').removeAttr('onclick');
    })
    */

    //$('body').on('click', '#MainContent_btnLap', function () {
    //    TotalPrice = 0;
    //    listSelected = [];
    //})
}
function LoadKH() {
    var Contact = $('#MainContent_txtPhoneNumber').val();
    $.ajax({
        type: "POST",
        url: "Default.aspx/GetKH",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data:
        "{ contact: '"+Contact+"' }",
        error: function (e) { 
            
        },
        success: function (result) {
            if (result.d == null) {
                alert("Sai số điện thoại hoặc số điện thoại chưa có");
           
                $('#formMuahang').trigger('reset');
            }
            else {
                console.log(result)
                $('#MainContent_txtCustomerID').val(result.d.Id);
                $('#MainContent_txtAddress').val(result.d.Address);
                $('#MainContent_txtCustomerName').val(result.d.Name);
                $('#MainContent_txtKHContact').val(result.d.Contact);
                
            }
        }
    });

}
function SaveKH() {
    var kHId = 0;
    var Name = $('#txtAddKHName').val();
    var Contact = $('#txtAddKHContact').val();
    var Address = $('#txtAddKHAddress').val();
    $.ajax({
        type: "POST",
        url: "Default.aspx/SaveKhachHang",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({ 'KHId': kHId, 'Name': Name, 'Contact': Contact, 'Address': Address }),
        //{
        //        KHId: kHId,
        //        Name: Name,
        //        Contact: Contact,
        //        Address: Address,
        //},
       
        error: function (e) {
            console.log(e);
        },
        success: function (result) {
            console.log('successSaveKH');
            $('#formKH').trigger('reset');
            $('#modal-add-KH').modal('hide');     
            $('#LapHoaDon').modal('show');  
            
            $.ajax({
                type: "POST",
                url: "Default.aspx/GetKH",
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                data:
                    "{ contact: '" + Contact + "' }",
                error: function (e) {

                },
                success: function (result) {
                    
                    
                        console.log(result)
                        $('#MainContent_txtCustomerID').val(result.d.Id);
                        $('#MainContent_txtAddress').val(result.d.Address);
                        $('#MainContent_txtCustomerName').val(result.d.Name);
                        $('#MainContent_txtKHContact').val(result.d.Contact);
                     $('#MainContent_txtPhoneNumber').val(Contact);
                    
                }
            });
        }
    });

}
function SaveHoaDon(TotalPrice) {
    //var hdId = 0;
    var khId = parseInt($('#MainContent_txtCustomerID').val());
    if (khId == 0) { alert("Khách hàng không tồn tại") }
    else {
        var totalPrice = parseInt($('#txtTotalPrice').val());
        var listCTHD = [];
        var _customname;
        if ($('#MainContent_txtTenKhachGiao').val() == "") {
            _customname = $('#MainContent_txtCustomerName').val();
        }
        else {
            _customname = $('#MainContent_txtTenKhachGiao').val();
        }
        var _address;
        if ($('#MainContent_txtDiaChi').val() == "") {
            _address = $('#MainContent_txtAddress').val();
        }
        else {
            _address = $('#MainContent_txtDiaChi').val();
        }
        var _contact;
        if ($('#MainContent_txtContact').val() == "") {
            _contact = $('#MainContent_txtKHContact').val();
        }
        else {
            _contact = $('#MainContent_txtContact').val();
        }
        var _gh = {
            GHId: 0,
            HDId: 0,
            TotalPrice: totalPrice,
            CustomerName: _customname,
            DeliveryContact: _contact,
            DeliveryAddress: _address,

        };

        $.each(listSelected, function (i, item) {
            var _cthdID = parseInt(item.TBId);
            var _cthdQty = parseInt(item.SelectedQty);
            var _cthdPrice = parseInt(item.SelectedQty) * parseInt(item.Price);

            var _cthd = {
                HDId: 0,
                TBId: _cthdID,
                Qty: _cthdQty,
                SubTotal: _cthdPrice,
            };
            listCTHD.push(_cthd);
        })

        var _saleoff;
        if (listSelected.length > 1) { _saleoff = 0.1 }
        else { _saleoff = 0;}
        $.ajax({
            type: "POST",
            url: "Default.aspx/SaveInvoice",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({ 'KhId': khId, 'total': totalPrice, 'saleoff': _saleoff   , 'listCTHD': listCTHD, 'GH': _gh }),

            //{
            //    //mahd: hdid,
            //    khid: khid,
            //    total:  totalprice,
            //},
            error: function (e) {
                console.log(e);
            },
            success: function (result) {
                console.log('successSaveHD');
                $('#formMuahang').trigger('reset');
                $('#tblSelectedProducts').empty();
                $('#LapHoaDon').modal('hide');
                $('#tblSelectedProduct').empty();
                $('#lblTotalPrice').text(0);
                alert("Lập hóa đơn thành công");
            }
        });
    }
}

function LoadTypeData() {
    var typeId = $('#MainContent_slcType').val();
    $.ajax({
        type: "POST",
        url: "Default.aspx/GetByType",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data:
            "{ Id: '" + typeId + "' }",
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        },
        success: function (result) {
            if (result.d == null) {
                alert("Sai số điện thoại hoặc số điện thoại chưa có");
            }
            else {
                console.log(result)
                $('#MainContent_txtCustomerID').val(result.d.Id);
                $('#MainContent_txtAddress').val(result.d.Address);
                $('#MainContent_txtCustomerName').val(result.d.Name);
            }
        }
    });

}


PageLoad();