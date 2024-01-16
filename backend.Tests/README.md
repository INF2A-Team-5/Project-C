# How to set up the test

1. In pgAdmin, creat a new database with the name "ProjectC_Test_Database" in the same place as the existing database.
2. Change the name of the used database in DataContext.cs file to "ProjectC_Test_Database" while executing the tests.

3. Before running each service test, run the following commands in the backend folder while having the most up-to-date migration.

If you don't have the latest migration:

```bash
  dotnet ef migrations add migrationName
```

Drop the existing database:

```bash
  dotnet ef database drop
```

Creat a new database;

```bash
  dotnet ef database update
```

Populate the datatbase:

```bash
  dotnet run
```

4. Execute your desired tests from their file in the "backend.Tests" folder.

Repeat these steps if you want to run the test again.
