using FluentMigrator;

namespace SignalRChat.Infrastructure.Data.Migrations
{
    [Migration(202004231720)]
    public class AddCreatedOnAndModifiedOnInUserChannelRelationship : Migration
    {
        public override void Down()
        {
            Delete.Column("createdOn").FromTable("users_channels");
            Delete.Column("modifiedOn").FromTable("users_channels");
        }
        public override void Up()
        {
            Alter.Table("users_channels")
                .AddColumn("createdOn").AsCustom("DateTime2(2)").WithDefault(SystemMethods.CurrentDateTime)
                .AddColumn("modifiedOn").AsCustom("DateTime2(2)").WithDefault(SystemMethods.CurrentDateTime);
        }
    }
}
