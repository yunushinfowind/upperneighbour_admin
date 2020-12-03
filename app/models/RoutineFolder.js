const db = require(".");
const config = require("../config/config.js");
const User = db.users;
module.exports = (sequelize, Sequelize) => {
    const RoutineFolder = sequelize.define("routineFolder", {
        routine_id: {
            type: Sequelize.INTEGER
        },
        
        folder_info: {
            type: Sequelize.TEXT,
            get() {
                return (JSON.parse(this.getDataValue('folder_info'))) ;
            }
        },
        type: {
            type: Sequelize.STRING,
        }
    },

        {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },

    );
    return RoutineFolder;
};
