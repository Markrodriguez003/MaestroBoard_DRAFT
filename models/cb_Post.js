module.exports = (sequelize, DataTypes) => {
    const cb_Post = sequelize.define("cb_Post", {

        FKUser: {
            type: DataTypes.STRING,
            
        },

        postBody: {
            type: DataTypes.STRING,
        },
        postTitle: {
            type: DataTypes.STRING,
        },
        FKCriteria: {
            type: DataTypes.STRING,
        },
        FKInstrument: {
            type: DataTypes.STRING,
            

        },

    });

    // cb_Post.associate = (models) => {
    //     cb_Post.belongsTo(models.cb_User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return cb_Post;
};

