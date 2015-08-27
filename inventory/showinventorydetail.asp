<%
      dim res
      res = "{""Header"": [""FromWarehouseName"",""ToWarehouseName"",""InventoryState"",""CreateDT"",""ExpressNO"",""CreateEmp""],""Rst"": [["""",""上海"",""dfsa"",""25/11/2014 06:13:40"",""111"",""admin""],[""adsaf"",""asdf"",""asdf"",""25/11/2014 06:13:40"",""111"",""admin""]]}"
      response.Addheader "Content-Type","text/html; charset=gb2312"
      response.write res
  %>