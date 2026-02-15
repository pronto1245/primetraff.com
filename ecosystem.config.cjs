module.exports = {
  apps: [
    {
      name: "primetraff",
      script: "dist/index.cjs",
      cwd: "/var/www/primetraff.com",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        ADMIN_PASSWORD: "primetraff2026",
        DATABASE_URL: "postgresql://neondb_owner:npg_dFG0fkbHjqn3@ep-dawn-moon-a2ic9090-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
      },
      max_restarts: 10,
      restart_delay: 3000,
      watch: false
    }
  ]
};
