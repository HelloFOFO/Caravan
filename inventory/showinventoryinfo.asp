<%
    dim id
    dim result
    id = request.form("id")

    'res = "{""Header"": [""id"",""status"",""createDT""],""Rst"": [["""+id+""",""ing"",""25/11/2014 06:13:40""]]}"
    res = "{""Header"":[""ExpressNO"",""SenderProvince"",""SenderName"",""ReceiverProvince"",""ReceiverName"",""PkgNum"",""PickupDate"",""WarehouseName"",""TransferName"",""InventoryState"",""RowID""], ""Rst"":[["""+id+""",""Shanghai"",""Banzhang"",""beijingshi"",""laowu"",""1"",""11/12/2014 09:33:41"",""shanghaicang"","""",""yishoujian"",""17""]]}"
    response.write res


%>