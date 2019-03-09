﻿<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="quanlybanhang._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <form id="frmSearch">
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="txtSearch">Tìm theo tên</label>
                <input type="text" id="txtSearch" class="form-control" runat="server">
            </div>
            <div class="form-group col-md-6">
                <label for="slcType">Tìm theo loại</label>
                <select id="slcType" class="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                </select>
            </div>
        </div>        
    </form>
    <form id="frmProduct">
        <div class="col-sm-5">
            <table class="table table-bordered" id="tblProduct">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tên thiết bị</th>
                        <th>Loại thiết bị</th>
                        <th>Đơn giá</th>
                        <th>Số lượng tồn</th>
                    </tr>
                </thead>
                <tbody id="tbl_ThietBi" runat="server"></tbody>
            </table>
        </div>
    </form>
    

    <div class="col-sm-2" style="display: flex;justify-content: center;align-items: center;">
        <button type="button" class="btn btn-default" id="btnSelect">Chọn</button>
    </div>

    <div class="col-sm-5">
        <table class="table table-bordered" id="tblSelected">
            <thead>
                <tr>
                    <th>Tên thiết bị</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tblSelectedProduct">

            </tbody>
        </table>
        <div style="display: -webkit-box;">
            <h3>Tổng tiền:</h3> <h3 id="lblTotalPrice"></h3>
        </div>
    </div>

    <div class="col-sm-12" style="display: flex;justify-content: center;align-items: center;">
        <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#LapHoaDon" id="btnLapHoaDon">Lập hóa đơn</button>
    </div>

    <!--Modal-->
    <div class="modal fade" id="LapHoaDon" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Lập hóa đơn</h3>
                </div>
                <div class="modal-body">
                    <div class="form-group row" style="display: flex;justify-content: center;align-items: center;">
                        <input type="hidden" id="txtMaKhachHang" value="0" runat="server" />
                        <label for="txtPhoneNumber" class="col-sm-2 col-form-label">Điện thoại: </label>
                        <div class="col-sm-5">
                            <input type="text" class="form-control" id="txtPhoneNumber" placeholder="Điện thoại" runat="server">
                        </div>
                        <button class="btn btn-primary" type="button">Thêm khách hàng mới</button>
                    </div>
                    <p id="txtAddress">Địa chỉ: </p>
                    <p id="txtCustomerID">Mã khách hàng: </p>

                    <div class="row">
                        <div class="col-lg-6">
                            <label for="txtTenKhachGiao">Tên người nhận hàng:</label>
                            <input type="text" id="txtTenKhachGiao" class="form-control" runat="server">
                        </div>
                        <div class="col-lg-6">
                            <label for="txtDiaChi">Địa chỉ nhận hàng:</label>
                            <input type="text" id="txtDiaChi" class="form-control" runat="server">
                        </div>
                        <div class="col-lg-6">
                            <label for="txtContact">Điện thoại người nhận hàng:</label>
                            <input type="text" id="txtContact" class="form-control" runat="server">
                        </div>
                    </div>
                    <asp:Panel runat="server" ID="pnlTblSelected">
                        <table id="tblSlc" class="table table-bordered" style="margin-top: 10px;">
                            <thead>
                                <tr>
                                    <th colspan="4">Các sản phẩm đã chọn
                                    </th>
                                </tr>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody id="tblSelectedProducts">
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </table>
                    </asp:Panel>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnLap" > Lập Hóa Đơn </button>
                    <!--<asp:Button ID="btnLap" CssClass="btn btn-success" OnClientClick="return GetTable()" Text="Lập Hóa Đơn" runat="server" />-->
                    <button type="button" class="btn btn-danger" id="btnDismiss" data-dismiss="modal">Hủy</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
