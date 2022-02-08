module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NEXT_PUBLIC_APP_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
