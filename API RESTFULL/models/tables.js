module.exports = (sequelize, DataType) => {
  const Tables = sequelize.define('Table', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    qtdChairs: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  });
  return Tables;
};
