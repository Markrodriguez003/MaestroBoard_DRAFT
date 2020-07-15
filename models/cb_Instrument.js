module.exports = (sequelize, DataTypes) => {



    // Creating instrument table
    const cb_Instrument = sequelize.define("cb_Instrument", {
        instrument: {
            type: DataTypes.STRING,
        }
    },{ timestamps: false });

    // Associate instrument table to Post table (foreign key)
    // cb_Instrument.associate =  (models) => {
    //     cb_Instrument.belongsTo(models.cb_Post, {
    //         foreignKey: {
    //             allowNull: true
    //         }
    //     });
    // };

    return cb_Instrument;
};




