const Sequelize = require('sequelize');
const config = require('../config/config')['production'];

// db connection
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 냉장고 테이블
db.fresh = require('./fresh')(sequelize, Sequelize);
db.frozen = require('./frozen')(sequelize, Sequelize);

// 좋아요 테이블
db.recipe_like = require('./recipe_like')(sequelize, Sequelize);

// 레시피 테이블
db.recipe = require('./recipe')(sequelize, Sequelize);

// 유저 테이블
db.user = require('./user')(sequelize, Sequelize);

// 로그 테이블
db.log = require('./log')(sequelize, Sequelize);
db.cooklog = require('./cooklog')(sequelize, Sequelize);

//forien key 설정
// 1. like 테이블과 user 테이블
// 1-1. like 테이블의 user_id는 user 테이블의 user_id를 참조하고 있다.
// db.like의 user_id는 db.user의 user_id에 속한다.
db.recipe_like.belongsTo(db.user, {
  foreignKey: 'user_user_id', // like테이블의 foreignkey할 컬럼 이름
  targetKey: 'user_id', // user테이블의 user_id컬럼 이름
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
// 1-2. user 테이블의 user_id는 like 테이블의 user_id에 참조된다.
// db.User는 가지고있다. 많이. db.like를
db.user.hasMany(db.recipe_like, {
  foreignKey: 'user_user_id', // like테이블의 foreignkey할 컬럼 이름
  sourceKey: 'user_id', // user테이블의 user_id컬럼 이름
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// 2. like 테이블과 recipe 테이블
// 2-1. like 테이블의 recipe_id는 recipe 테이블의 recipe_id를 참조하고 있다.
// db.like의 recipe_id는 db.recipe의 recipe_id에 속한다.
db.recipe_like.belongsTo(db.recipe, {
  foreignKey: 'recipe_recipe_id', // like테이블의 foreignkey할 컬럼 이름
  targetKey: 'recipe_id', // recipe테이블의 recipe_id 컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
// 2-2. recipe 테이블의 recipe_id는 like 테이블의 recipe_id에 참조된다.
// db.recipe는 가지고있다. db.like를
db.recipe.hasOne(db.recipe_like, {
  foreignKey: 'recipe_recipe_id', // like테이블의 foreignkey할 컬럼 이름
  sourceKey: 'recipe_id', // recipe테이블의 recipe_id 컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// 3. log 테이블과 user 테이블
// 3-1. log 테이블의 user_id는 user 테이블의 user_id를 참조하고 있다.
// db.log의 user_id는 db.user의 user_id에 속한다.
db.log.belongsTo(db.user, {
  foreignKey: 'user_user_id', // log테이블의 foreignkey할 컬럼 이름
  targetKey: 'user_id', // user테이블의 user_id컬럼 이름
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
// 3-2. user 테이블의 user_id는 log 테이블의 user_id에 참조된다.
// db.User는 가지고있다. 많이. db.log를
db.user.hasMany(db.log, {
  foreignKey: 'user_user_id', // log테이블의 foreignkey할 컬럼 이름
  sourceKey: 'user_id', // user테이블의 user_id컬럼 이름
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// 4. log 테이블과 recipe 테이블
// 4-1. log 테이블의 recipe_id는 recipe 테이블의 recipe_id를 참조하고 있다.
// db.log의 recipe_id는 db.recipe의 recipe_id에 속한다.
db.log.belongsTo(db.recipe, {
  foreignKey: 'recipe_recipe_id', // log테이블의 foreignkey할 컬럼 이름
  targetKey: 'recipe_id', // recipe테이블의 recipe_id 컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
// 4-2. recipe 테이블의 recipe_id는 log 테이블의 recipe_id에 참조된다.
// db.recipe는 가지고있다 db.log를
db.recipe.hasOne(db.log, {
  foreignKey: 'recipe_recipe_id', // log테이블의 foreignkey할 컬럼 이름
  sourceKey: 'recipe_id', // recipe테이블의 recipe_id 컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// 5. cooklog 테이블과 user테이블
// 5-1. cooklog 테이블의 user_id는 user 테이블의 user_id를 참조하고 있다.
// db.cooklog의 user_id는 db.user의 user_id에 속한다.
db.cooklog.belongsTo(db.user, {
  foreignKey: 'user_user_id', // cooklog테이블의 foreignkey할 컬럼 이름
  targetKey: 'user_id', // user테이블의 user_id컬럼 이름
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
// 5-2. user 테이블의 user_id는 cooklog 테이블의 user_id에 참조된다.
// db.User는 가지고있다. 많이. db.cooklog를
db.user.hasMany(db.cooklog, {
  foreignKey: 'user_user_id', // cooklog테이블의 foreignkey할 컬럼 이름
  sourceKey: 'user_id', // user테이블의 user_id컬럼 이름
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// 6. cooklog 테이블과 recipe 테이블
// 6-1. cooklog 테이블의 recipe_id는 recipe 테이블의 recipe_id를 참조하고 있다.
// db.cooklog의 recipe_id는 db.recipe의 recipe_id에 속한다.
db.cooklog.belongsTo(db.recipe, {
  foreignKey: 'recipe_recipe_id', // cooklog테이블의 foreignkey할 컬럼 이름
  targetKey: 'recipe_id', // recipe테이블의 recipe_id 컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
// 6-2. recipe 테이블의 recipe_id는 cooklog 테이블의 recipe_id에 참조된다.
// db.recipe는 가지고있다 db.cooklog를
db.recipe.hasOne(db.cooklog, {
  foreignKey: 'recipe_recipe_id', // cooklog테이블의 foreignkey할 컬럼 이름
  sourceKey: 'recipe_id', // recipe테이블의 recipe_id 컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// 7. fresh 테이블과 user 테이블
// 7-1. fresh 테이블의 user_id는 user 테이블의 user_id를 참조하고 있다.
// db.fresh의 user_id는 db.user의 user_id에 속한다.
db.fresh.belongsTo(db.user, {
  foreignKey: 'user_user_id', // fresh테이블의 foreignkey할 컬럼 이름
  targetKey: 'user_id', // user테이블의 user_id컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
// 7-2. user 테이블의 user_id는 fresh 테이블의 user_id에 참조된다.
// db.user는 가지고있다. 많이. db.fresh를
db.user.hasMany(db.fresh, {
  foreignKey: 'user_user_id', // fresh테이블의 foreignkey할 컬럼 이름
  sourceKey: 'user_id', // user테이블의 user_id컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// 8. fresh 테이블과 recipe 테이블
// 8-1. frozen 테이블의 user_id는 user 테이블의 user_id를 참조하고 있다.
// db.frozen의 user_id는 db.user의 user_id에 속한다.
db.frozen.belongsTo(db.user, {
  foreignKey: 'user_user_id', // frozen테이블의 foreignkey할 컬럼 이름
  targetKey: 'user_id', // user테이블의 user_id 컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
// 8-2. user 테이블의 user_id는 frozen 테이블의 user_id에 참조된다.
// db.user는 가지고있다 db.frozen를
db.user.hasMany(db.frozen, {
  foreignKey: 'user_user_id', // frozen테이블의 foreignkey할 컬럼 이름
  sourceKey: 'user_id', // user테이블의 user_id 컬럼
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

module.exports = db;
