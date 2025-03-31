INSERT INTO Containers (Number, Type, Length, Width, Height, Weight, IsEmpty, ArrivalDate)
VALUES 
    (1001, '20ft', 6.06, 2.44, 2.59, 2200, 0, '2023-01-15T08:30:00'),
    (1002, '40ft', 12.19, 2.44, 2.59, 3800, 1, '2023-02-20T10:15:00'),
    (1003, 'Reefer', 6.06, 2.44, 2.59, 2800, 0, '2023-03-10T14:45:00');

INSERT INTO Operations (ContainerId, OperationStartDate, OperationEndDate, OperationType, OperatorFullName, InspectionPlace)
SELECT 
    Id, 
    DATEADD(DAY, 1, ArrivalDate), 
    DATEADD(DAY, 2, ArrivalDate), 
    CASE WHEN IsEmpty = 1 THEN 'Inspection' ELSE 'Loading' END,
    'John Doe',
    'Warehouse #1'
FROM Containers;