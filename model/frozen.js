const frozen = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'frozen',
    {
      frozen_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      frozen_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      frozen_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      frozen_range: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      user_user_id: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      underscored: true, // 카멜표기법 -> 스네이크로
      tableName: 'frozen',
      freezeTableName: true,
      timestamps: false,
      paranoid: false, // true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록
    }
  );
};

module.exports = frozen;
