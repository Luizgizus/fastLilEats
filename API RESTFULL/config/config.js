module.exports = {
  database: 'fastLilEats',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `fastLilEats.sqlite`,
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'lilEats##',
  jwtSession: { session: false },
};

