using FluentMigrator;

namespace SignalRChat.Infrastructure.Data.Migrations
{
    [Migration(202003301600)]
    public class AddUsersTable : Migration
    {
        public override void Down()
        {
            Delete.Table("users");
        }
        public override void Up()
        {
            Create.Table("users")
                .WithColumn("id").AsGuid().PrimaryKey()
                .WithColumn("username").AsAnsiString(32).NotNullable().Unique()
                .WithColumn("createdOn").AsCustom("DateTime2(2)").WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsCustom("DateTime2(2)").WithDefault(SystemMethods.CurrentDateTime);
        }
    }
}