SELECT 
    '{' +
    '"Id": "' + CAST(Id AS NVARCHAR(36)) + '", ' +
    '"Number": ' + CAST(Number AS NVARCHAR(20)) + ', ' +
    '"Type": "' + Type + '", ' +
    '"Length": ' + CAST(Length AS NVARCHAR(20)) + ', ' +
    '"Width": ' + CAST(Width AS NVARCHAR(20)) + ', ' +
    '"Height": ' + CAST(Height AS NVARCHAR(20)) + ', ' +
    '"Weight": ' + CAST(Weight AS NVARCHAR(20)) + ', ' +
    '"IsEmpty": ' + CASE WHEN IsEmpty = 1 THEN 'true' ELSE 'false' END + ', ' +
    '"ArrivalDate": "' + CONVERT(NVARCHAR(30), ArrivalDate, 126) + '"' +
    '}' AS JsonData
FROM 
    Containers;

SELECT 
    '{' +
    '"Id": "' + CAST(o.Id AS NVARCHAR(36)) + '", ' +
    '"ContainerId": "' + CAST(o.ContainerId AS NVARCHAR(36)) + '", ' +
    '"OperationStartDate": "' + CONVERT(NVARCHAR(30), o.OperationStartDate, 126) + '", ' +
    '"OperationEndDate": "' + CONVERT(NVARCHAR(30), o.OperationEndDate, 126) + '", ' +
    '"OperationType": "' + o.OperationType + '", ' +
    '"OperatorFullName": "' + o.OperatorFullName + '", ' +
    '"InspectionPlace": "' + o.InspectionPlace + '"' +
    '}' AS JsonData
FROM 
    Operations o
INNER JOIN 
    Containers c ON o.ContainerId = c.Id
WHERE 
    c.IsEmpty = 0;