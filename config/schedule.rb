# Use this file to easily define all of your cron jobs.

set :output, { standard: 'log/cron.log', error: 'log/error.log' }

every 2.hours do
  rake 'archive_articles', environment: 'development'
end

# Learn more: http://github.com/javan/whenever
