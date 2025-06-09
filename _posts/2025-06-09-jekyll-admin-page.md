---
title: "[Jekyll] Admin page"
layout: post
date: '2025-06-09 13:00:00'
last_modified_at: 2025-06-09 13:00 +0900
tags:
- admin
- jekyll
---

Today contents

### Jekyll plugin supports **admin page**

1. add `jekyll-admin` in `_config.yml`
2. add `gem 'jekyll-admin'`  in `Gemfile`
3. run `bundle install`

U shouldn't show /admin endpoint in public, so only use this admin page in only dev.
in my case, I use two types of config file.

- `_config.yml`, `_config.dev.yml`
- run serve command with config file `bundle exec jekyll serve --config _config.yml,_config.dev.yml`
- when building this project all plugins in `_config.yml` will be updated by `_config.dev.yml`, so U should write all plugins used in `_config.yml` with `jekyll-admin` which is only written in `_config.dev.yml`

reason Why I install this plugin is that I am lazy to check md grammer.

Happy bloggin!!
