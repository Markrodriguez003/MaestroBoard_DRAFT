module.exports = (sequelize, DataTypes) => {
    const cb_User = sequelize.define("cb_User", {
        userName: {
            type: DataTypes.STRING,
        },
        userEmail: {
            type: DataTypes.STRING,
        },
        userNumber: {
            type: DataTypes.STRING,
        },
    });

    // cb_User.associate = function (models) {
    //     cb_User.hasMany(models.cb_Post, {
    //         onDelete: "cascade"
        
    //         // foreignKey: {
    //         //     allowNull: false
    //         // }
    //     });
    // };

    return cb_User;
};

