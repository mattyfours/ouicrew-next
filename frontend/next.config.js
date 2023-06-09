/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  presets: ['next/babel'],
  plugins: [],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
