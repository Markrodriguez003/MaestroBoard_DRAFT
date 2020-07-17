module.exports = (sequelize, DataTypes) => {
    const cb_Post = sequelize.define("cb_Post", {

        postTitle: {
            type: DataTypes.STRING,
        },
        postBody: {
            type: DataTypes.STRING,
        },
    });

    cb_Post.associate = (models) => {
        cb_Post.belongsTo(models.cb_Instrument, {
            foreignKey: 'fk_instrument',
            allowNull: false
        });

        cb_Post.belongsTo(models.cb_Criteria, {
            foreignKey: 'fk_criteria',
            allowNull: false
        });
        cb_Post.belongsTo(models.cb_User, {
            foreignKey: 'fk_user',
            allowNull: false
        });
    };


    return cb_Post;
};

