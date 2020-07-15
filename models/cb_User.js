module.exports = (sequelize, DataTypes) => {
    const cb_User = sequelize.define("cb_User", {
        userName: {
            type: DataTypes.STRING,
            // unique: true
        },
        userEmail: {
            type: DataTypes.STRING,
            // unique: true
        },
        userNumber: {
            type: DataTypes.STRING,
            // unique: true
        },
    });

    cb_User.associate = models => {
        cb_User.hasMany(models.cb_Post, {
            foreignKey: 'fk_user',
            onDelete: "cascade"
        });
    };

    return cb_User;
};

