# Generated by Django 5.1.4 on 2025-01-13 16:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_album_options_alter_album_title_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='albums', to='core.usuario'),
        ),
    ]
