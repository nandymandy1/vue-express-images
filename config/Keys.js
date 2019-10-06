module.exports = {
  db:
    process.env.NODE_ENV === "production"
      ? "server mongodb database url"
      : "mongodb://localhost:27017/image_uploads"
};
