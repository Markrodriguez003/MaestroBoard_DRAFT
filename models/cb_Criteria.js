module.exports = (sequelize, DataTypes) => {
    const cb_Criteria = sequelize.define("cb_Criteria", {
        criteria: {
            type: DataTypes.STRING,
        },
    }, { timestamps: false });

    cb_Criteria.associate = function (models) {
        cb_Criteria.hasMany(models.cb_Post, {

            foreignKey: 'fk_criteria',
            allowNull: false

        });
    };

    return cb_Criteria;
};

