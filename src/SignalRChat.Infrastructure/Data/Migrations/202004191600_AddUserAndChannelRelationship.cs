using FluentMigrator;

namespace SignalRChat.Infrastructure.Data.Migrations
{
    [Migration(202004191600)]
    public class AddUserAndChannelRelationship : Migration
    {
        public override void Down()
        {
            Delete.Table("users_channels");
        }
        public override void Up()
        {
            Create.Table("users_channels")
                .WithColumn("userId").AsGuid().ForeignKey("users", "id").PrimaryKey().NotNullable()
                .WithColumn("channelId").AsGuid().ForeignKey("channels", "id").PrimaryKey().NotNullable()
                .WithColumn("isAdministrator").AsBoolean().NotNullable();
        }
    }
}
