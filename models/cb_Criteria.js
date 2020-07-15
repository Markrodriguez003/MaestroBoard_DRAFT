module.exports = (sequelize, DataTypes) => {
    const cb_Criteria = sequelize.define("cb_Criteria", {
        criteria: {
            type: DataTypes.STRING,
        },
    },{ timestamps: false });

    // cb_Criteria.associate = function (models) {
    //     cb_Criteria.belongsTo(models.cb_Post, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return cb_Criteria;
};

