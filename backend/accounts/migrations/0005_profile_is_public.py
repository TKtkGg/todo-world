# Generated manually for Profile.is_public

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0004_like"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="is_public",
            field=models.BooleanField(default=True),
        ),
    ]
