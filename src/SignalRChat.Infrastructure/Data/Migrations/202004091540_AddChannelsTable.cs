using FluentMigrator;

namespace SignalRChat.Infrastructure.Data.Migrations
{
    [Migration(202004091540)]
    public class AddChannelsTable : Migration
    {
        public override void Down()
        {
            Delete.Table("channels");
        }
        public override void Up()
        {
            Create.Table("channels")
                .WithColumn("id").AsGuid().PrimaryKey()
                .WithColumn("name").AsString(32).NotNullable()
                .WithColumn("description").AsString(100).Nullable()
                .WithColumn("administratorId").AsGuid().ForeignKey("users", "id").NotNullable()
                .WithColumn("createdOn").AsCustom("DateTime2(2)").WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("modifiedOn").AsCustom("DateTime2(2)").WithDefault(SystemMethods.CurrentDateTime);
        }
    }
}
